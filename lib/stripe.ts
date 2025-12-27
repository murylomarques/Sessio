import Stripe from 'stripe';

// Garante que a chave secreta existe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

// Instância única do Stripe para toda a aplicação
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover', // versão mais recente da API Stripe
  typescript: true,
});
