
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';

const PaymentSuccessHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { refetch } = useProfile();

  useEffect(() => {
    const payment = searchParams.get('payment');
    const amount = searchParams.get('amount');

    if (payment === 'success' && amount) {
      toast({
        title: "Pagamento realizado com sucesso!",
        description: `€${amount} foi adicionado ao seu saldo.`,
      });
      
      // Atualizar o perfil para refletir o novo saldo
      refetch();
      
      // Limpar parâmetros da URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('payment');
      newSearchParams.delete('amount');
      setSearchParams(newSearchParams);
    } else if (payment === 'cancelled') {
      toast({
        title: "Pagamento cancelado",
        description: "O pagamento foi cancelado pelo usuário.",
        variant: "destructive",
      });
      
      // Limpar parâmetros da URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('payment');
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, toast, refetch]);

  return null;
};

export default PaymentSuccessHandler;
