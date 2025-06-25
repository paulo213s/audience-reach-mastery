
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppContact {
  id: string;
  phone_number: string;
  created_at: string;
}

interface EmailContact {
  id: string;
  email: string;
  created_at: string;
}

export const useContacts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [whatsappContacts, setWhatsappContacts] = useState<WhatsAppContact[]>([]);
  const [emailContacts, setEmailContacts] = useState<EmailContact[]>([]);
  const [loading, setLoading] = useState(false);

  const saveWhatsAppContact = async (phoneNumber: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('whatsapp_contacts')
        .insert({
          user_id: user.id,
          phone_number: phoneNumber
        });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Número do WhatsApp salvo com sucesso!",
      });

      fetchWhatsAppContacts();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveEmailContact = async (email: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('email_contacts')
        .insert({
          user_id: user.id,
          email: email
        });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Email salvo com sucesso!",
      });

      fetchEmailContacts();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchWhatsAppContacts = async () => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('whatsapp_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWhatsappContacts(data || []);
    } catch (error: any) {
      console.error('Error fetching WhatsApp contacts:', error);
    }
  };

  const fetchEmailContacts = async () => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('email_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmailContacts(data || []);
    } catch (error: any) {
      console.error('Error fetching email contacts:', error);
    }
  };

  const openWhatsApp = (phoneNumber: string) => {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const openEmail = (email: string) => {
    const emailUrl = `mailto:${email}`;
    window.open(emailUrl, '_blank');
  };

  useEffect(() => {
    if (user) {
      fetchWhatsAppContacts();
      fetchEmailContacts();
    }
  }, [user]);

  return {
    whatsappContacts,
    emailContacts,
    loading,
    saveWhatsAppContact,
    saveEmailContact,
    openWhatsApp,
    openEmail,
    fetchWhatsAppContacts,
    fetchEmailContacts
  };
};
