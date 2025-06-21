
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();
  
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return new Response(err.message, { status: 400 });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    if (session.metadata?.type === "balance_topup") {
      const userId = session.metadata.user_id;
      const amount = parseFloat(session.metadata.amount);
      
      // Atualizar saldo do usuário
      const { error } = await supabaseAdmin.rpc('update_user_balance', {
        p_user_id: userId,
        p_amount: amount,
        p_transaction_type: 'credit',
        p_description: `Carregamento via Stripe - Sessão: ${session.id}`
      });

      if (error) {
        console.error('Error updating balance:', error);
        return new Response('Error updating balance', { status: 500 });
      }

      console.log(`Balance updated for user ${userId}: +€${amount}`);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
