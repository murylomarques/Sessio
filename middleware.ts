// /middleware.ts - VERSÃO FINAL COM LÓGICA DE PAYWALL

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { checkActiveSubscription } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;

  const authRoutes = ['/login', '/signup', '/forgot-password', '/update-password'];

  // REGRA DE CONVENIÊNCIA: Se o usuário está logado, não pode acessar as páginas de auth.
  if (session && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url));
  }

  // REGRA DE PROTEÇÃO E PAYWALL PARA A APLICAÇÃO
  if (pathname.startsWith('/app')) {
    // 1. Se não há sessão, redireciona para o login.
    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(url);
    }

    // 2. PAYWALL: Se há sessão, verifica se a assinatura está ativa.
    const hasActiveSubscription = await checkActiveSubscription();

    // Se NÃO há assinatura ativa E o usuário NÃO está tentando acessar a página de configurações...
    if (!hasActiveSubscription && pathname !== '/app/settings') {
      // ...força o redirecionamento para a página de configurações para que ele possa pagar.
      const url = new URL('/app/settings', request.url);
      url.searchParams.set('reason', 'subscription_required');
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// Configuração do matcher para definir onde o middleware atua.
export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de requisição, exceto para os seguintes:
     * - api (rotas de API, como o webhook do Stripe)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (arquivo de favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};