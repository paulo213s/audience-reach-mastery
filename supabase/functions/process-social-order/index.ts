
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simulador de API externa para redes sociais
const processOrderWithExternalAPI = async (orderData: any) => {
  console.log(`Processing order for ${orderData.service_name}`);
  console.log(`Target: ${orderData.link}`);
  console.log(`Quantity: ${orderData.quantity}`);
  
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simular sucesso (95% de chance)
  const success = Math.random() > 0.05;
  
  if (success) {
    return {
      success: true,
      external_id: `ext_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      estimated_completion: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    };
  } else {
    throw new Error('Falha na API externa - tente novamente');
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();
    
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Buscar dados do pedido
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error('Pedido não encontrado');
    }

    // Processar com API externa
    const result = await processOrderWithExternalAPI(order);
    
    // Atualizar status do pedido
    await supabaseAdmin
      .from('orders')
      .update({
        status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    // Simular progresso gradual
    setTimeout(async () => {
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const progress = (i / steps) * 100;
        const status = progress === 100 ? 'completed' : 'processing';
        
        await supabaseAdmin
          .from('orders')
          .update({
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);
        
        console.log(`Order ${orderId} progress: ${progress}%`);
      }
    }, 5000);

    return new Response(JSON.stringify({ 
      success: true, 
      external_id: result.external_id,
      message: 'Pedido enviado para processamento'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
