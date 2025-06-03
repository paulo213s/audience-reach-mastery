
import { useState } from 'react';
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

export function useOrders() {
  const { user } = useAuth();
  const { profile, updateBalance } = useProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const calculatePrice = (servicePrice: string, quantity: number) => {
    const pricePerThousand = parseFloat(servicePrice);
    return (pricePerThousand * quantity) / 1000;
  };

  const simulateFollowersGrowth = async (orderId: string, quantity: number, platform: string) => {
    // Simular crescimento gradual de seguidores
    const intervals = 10; // Dividir em 10 partes
    const followersPerInterval = Math.floor(quantity / intervals);
    
    for (let i = 0; i < intervals; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos entre cada atualização
      
      const currentProgress = Math.min(((i + 1) / intervals) * 100, 100);
      
      console.log(`${platform} - Progresso do pedido ${orderId}: ${currentProgress.toFixed(1)}% (${(i + 1) * followersPerInterval}/${quantity} seguidores)`);
      
      // Atualizar status do pedido no banco
      await supabase
        .from('orders')
        .update({ 
          status: currentProgress === 100 ? 'completed' : 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
    }

    return true;
  };

  const createOrder = async (orderData: OrderData) => {
    if (!user || !profile) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer um pedido.",
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
      // Criar o pedido
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
          status: 'processing'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Debitar o valor da conta
      await supabase.rpc('update_user_balance', {
        p_user_id: user.id,
        p_amount: orderData.amount,
        p_transaction_type: 'debit',
        p_description: `Pedido: ${orderData.serviceName}`,
        p_order_id: order.id
      });

      toast({
        title: "Pedido criado com sucesso!",
        description: `Seu pedido de ${orderData.quantity} ${orderData.serviceName.toLowerCase()} foi iniciado.`,
      });

      // Simular crescimento de seguidores em background
      const platform = orderData.serviceName.split(' - ')[0];
      simulateFollowersGrowth(order.id, orderData.quantity, platform);

      return true;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
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
    isLoading
  };
}
