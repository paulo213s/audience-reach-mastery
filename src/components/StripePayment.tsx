
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StripePaymentProps {
  onClose: () => void;
}

const StripePayment = ({ onClose }: StripePaymentProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [10, 25, 50, 100, 200, 500];

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) < 1) {
      toast({
        title: "Valor inválido",
        description: "O valor mínimo é €1.00",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: {
          amount: parseFloat(amount),
          currency: 'eur'
        }
      });

      if (error) throw error;

      // Abrir Stripe Checkout em nova aba
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecionando para pagamento",
        description: "Uma nova aba foi aberta com o checkout do Stripe.",
      });
      
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível iniciar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Carregamento de Saldo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Valor (€)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="1"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {predefinedAmounts.map((value) => (
            <Button
              key={value}
              variant="outline"
              size="sm"
              onClick={() => setAmount(value.toString())}
              className="text-sm"
            >
              €{value}
            </Button>
          ))}
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Pagamento seguro via Stripe</strong>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Seus dados são protegidos por criptografia SSL
          </p>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!amount || loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CreditCard className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Processando...' : `Pagar €${amount || '0'}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripePayment;
