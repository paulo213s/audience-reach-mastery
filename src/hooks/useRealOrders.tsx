
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderData {
  serviceId: string;
  serviceName: string;
  link: string;
  quantity: number;
  amount: number;
}

export function useRealOrders() {
  const { user } = useAuth();
  const { profile, refetch: refetchProfile } = useProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
      
      // Configurar escuta em tempo real para atualizações de pedidos
      const channel = supabase
        .channel('orders-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Order update:', payload);
            fetchOrders();
            
            if (payload.eventType === 'UPDATE' && payload.new.status === 'completed') {
              toast({
                title: "Pedido Concluído!",
                description: `Seu pedido de ${payload.new.service_name} foi finalizado.`,
              });
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculatePrice = (servicePrice: string, quantity: number) => {
    const pricePerThousand = parseFloat(servicePrice);
    return (pricePerThousand * quantity) / 1000;
  };

  const validateOrder = (orderData: OrderData) => {
    if (!orderData.link.trim()) {
      return { valid: false, message: 'Link é obrigatório' };
    }
    
    if (orderData.quantity < 100) {
      return { valid: false, message: 'Quantidade mínima é 100' };
    }
    
    if (orderData.quantity > 1000000) {
      return { valid: false, message: 'Quantidade máxima é 1.000.000' };
    }

    // Validar formato básico do link
    try {
      new URL(orderData.link);
    } catch {
      return { valid: false, message: 'Formato de link inválido' };
    }

    return { valid: true, message: '' };
  };

  const createOrder = async (orderData: OrderData) => {
    if (!user || !profile) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer um pedido.",
        variant: "destructive",
      });
      return false;
    }

    const validation = validateOrder(orderData);
    if (!validation.valid) {
      toast({
        title: "Dados inválidos",
        description: validation.message,
        variant: "destructive",
      });
      return false;
    }

    if (profile.balance < orderData.amount) {
      toast({
        title: "Saldo insuficiente",
        description: `Você precisa de €${orderData.amount.toFixed(2)} mas tem apenas €${profile.balance.toFixed(2)}.`,
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Criar o pedido no banco
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          service_id: orderData.serviceId,
          service_name: orderData.serviceName,
          link: orderData.link,
          quantity: orderData.quantity,
          amount: orderData.amount,
          order_type: 'social_media',
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Debitar saldo
      const { error: balanceError } = await supabase.rpc('update_user_balance', {
        p_user_id: user.id,
        p_amount: orderData.amount,
        p_transaction_type: 'debit',
        p_description: `Pedido: ${orderData.serviceName}`,
        p_order_id: order.id
      });

      if (balanceError) throw balanceError;

      // Processar pedido com API externa
      const { error: processError } = await supabase.functions.invoke('process-social-order', {
        body: { orderId: order.id }
      });

      if (processError) {
        console.error('Process error:', processError);
        // Não falhar aqui, apenas logar o erro
      }

      toast({
        title: "Pedido criado com sucesso!",
        description: `Seu pedido de ${orderData.quantity.toLocaleString()} ${orderData.serviceName.toLowerCase()} foi iniciado.`,
      });

      // Atualizar dados
      await Promise.all([fetchOrders(), refetchProfile()]);

      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Erro ao criar pedido",
        description: "Não foi possível processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    calculatePrice,
    isLoading,
    orders,
    fetchOrders
  };
}
