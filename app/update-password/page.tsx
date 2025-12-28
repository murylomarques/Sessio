'use client';

import { updateUserPassword } from '@/app/_actions'; // Você precisará criar essa action simples
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Função simples para submeter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Chame a server action ou supabase client aqui
    // Exemplo chamando supabase direto no cliente:
    /* 
      const supabase = createClientComponentClient();
      await supabase.auth.updateUser({ password });
    */
    alert('Senha atualizada!');
    router.push('/app/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
        <h1 className="text-xl mb-4">Definir Nova Senha</h1>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nova senha"
          className="border p-2 mb-4 w-full"
          required 
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Salvar
        </button>
      </form>
    </div>
  );
}