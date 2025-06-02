
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Euro } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

interface BalanceTopUpProps {
  onClose: () => void;
}

const BalanceTopUp = ({ onClose }: BalanceTopUpProps) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateBalance } = useProfile();

  const predefinedAmounts = [10, 25, 50, 100, 200, 500];

  const handleTopUp = async () => {
    if (!amount || !paymentMethod) return;
    
    setLoading(true);
    await updateBalance(parseFloat(amount), `Carregamento via ${paymentMethod}`);
    setLoading(false);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Adicionar Saldo</span>
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
              className="flex items-center space-x-1"
            >
              <Euro className="w-3 h-3" />
              <span>{value}</span>
            </Button>
          ))}
        </div>

        <div>
          <Label htmlFor="payment">Método de Pagamento</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="stripe">Cartão de Crédito</SelectItem>
              <SelectItem value="mbway">MB WAY</SelectItem>
              <SelectItem value="multibanco">Multibanco</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleTopUp}
            disabled={!amount || !paymentMethod || loading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Processando...' : `Adicionar €${amount || '0'}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTopUp;
