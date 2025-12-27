// /app/app/settings/SettingsForm.tsx
"use client";
import { useI18n } from '@/lib/useI18n';
import { useFormState, useFormStatus } from 'react-dom';
import { updateProfile, createStripePortalLink } from '@/app/_actions';
import { useEffect } from 'react';

const initialProfileState = { success: false, error: null, message: '' };

function SubmitProfileButton() { /* ... */ }
function PortalButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={disabled || pending}>{pending ? "Carregando..." : "Gerenciar Assinatura"}</button>;
}

export default function SettingsForm({ profile }: { profile: any }) {
  const { t } = useI18n();
  const [profileState, profileAction] = useFormState(updateProfile, initialProfileState);
  
  useEffect(() => {
    if (profileState.message) {
      alert(profileState.message); // Feedback simples para o usuário
    }
  }, [profileState]);

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Configurações</h1>
        <p className="mt-1 text-neutral-600">Gerencie suas informações e assinatura.</p>
      </div>

      {/* Formulário de Perfil */}
      <form action={profileAction} className="space-y-6 rounded-lg bg-white p-8 shadow-sm border">
        <h2 className="text-lg font-semibold">Seu Perfil</h2>
        <div>
          <label htmlFor="fullName">Nome Completo</label>
          <input id="fullName" name="fullName" type="text" defaultValue={profile.full_name} required />
        </div>
        <div>
          <label htmlFor="licenseNumber">Nº de Licença (CRP, etc.)</label>
          <input id="licenseNumber" name="licenseNumber" type="text" defaultValue={profile.license_number || ''} />
        </div>
        <div className="flex justify-end">
          <SubmitProfileButton />
        </div>
      </form>

      {/* Seção de Assinatura */}
      <div className="space-y-4 rounded-lg bg-white p-8 shadow-sm border">
        <h2 className="text-lg font-semibold">Sua Assinatura</h2>
        <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Plano Solo</p>
              <p className="text-sm font-medium text-green-600">Status: {profile.subscription_status || 'trialing'}</p>
            </div>
            <form action={createStripePortalLink}>
                <PortalButton disabled={!profile.stripe_customer_id} />
            </form>
        </div>
      </div>
    </div>
  );
}