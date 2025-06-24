
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Mail } from 'lucide-react';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'whatsapp' | 'email';
  onSave: (value: string) => void;
  loading: boolean;
}

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onOpenChange,
  type,
  onSave,
  loading
}) => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    if (value.trim()) {
      onSave(value.trim());
      setValue('');
      onOpenChange(false);
    }
  };

  const isWhatsApp = type === 'whatsapp';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {isWhatsApp ? (
              <MessageCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Mail className="w-5 h-5 text-blue-600" />
            )}
            <span>
              {isWhatsApp ? 'Adicionar WhatsApp' : 'Adicionar Email'}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact">
              {isWhatsApp ? 'Número do WhatsApp' : 'Endereço de Email'}
            </Label>
            <Input
              id="contact"
              type={isWhatsApp ? 'tel' : 'email'}
              placeholder={isWhatsApp ? '19 992430588' : 'contato@exemplo.com'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave} disabled={loading || !value.trim()}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
