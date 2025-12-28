// /middleware.ts - VERSÃO FINAL DE PRODUÇÃO

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Cria uma resposta inicial. A lógica abaixo irá atualizá-la se necessário.
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Cria um cliente Supabase que funciona no lado do servidor (Server Components, Route Handlers, Middleware).
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
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Obtém a sessão do usuário. Esta função também atualiza o cookie de sessão se ele estiver expirado.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl;

  // REGRA DE PROTEÇÃO: Se não há sessão E o usuário tenta acessar uma rota protegida...
  if (!session && pathname.startsWith('/app')) {
    // Redireciona o usuário para a página de login.
    const url = new URL('/login', request.url);
    url.searchParams.set('redirectedFrom', pathname); // Opcional: para redirecionar de volta após o login
    return NextResponse.redirect(url);
  }

  // REGRA DE CONVENIÊNCIA: Se há sessão E o usuário tenta acessar uma rota de autenticação...
  if (session && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    // Redireciona o usuário para a área principal da aplicação.
    return NextResponse.redirect(new URL('/app/onboarding', request.url));
  }

  // Se nenhuma das regras acima for atendida, permite que a requisição continue normalmente.
  return response
}

// Configuração para definir quais rotas o middleware deve observar.
export const config = {
  matcher: [
    /*
     * Ignora rotas que NÃO devem passar pelo middleware
     */
    '/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook).*)',
  ],
}
