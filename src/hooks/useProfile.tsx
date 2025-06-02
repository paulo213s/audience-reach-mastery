
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  user_type: 'admin' | 'client';
  balance: number;
  created_at: string | null;
  updated_at: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar as informações do perfil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (amount: number, description: string) => {
    try {
      const { error } = await supabase.rpc('update_user_balance', {
        p_user_id: user?.id,
        p_amount: amount,
        p_transaction_type: 'credit',
        p_description: description
      });

      if (error) throw error;
      
      await fetchProfile(); // Refresh profile data
      
      toast({
        title: "Saldo atualizado",
        description: `€${amount} adicionado ao seu saldo.`,
      });
    } catch (error) {
      console.error('Error updating balance:', error);
      toast({
        title: "Erro ao atualizar saldo",
        description: "Não foi possível adicionar saldo à conta.",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    loading,
    updateBalance,
    refetch: fetchProfile
  };
}
