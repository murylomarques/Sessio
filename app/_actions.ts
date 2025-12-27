// /app/_actions.ts - VERSÃO FINAL, LIMPA E CONSISTENTE

"use server";

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Papa from 'papaparse';

// Ações de Pacientes
export async function importPatientsFromCSV(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const file = formData.get('file') as File;
  if (!file) { return { success: false, error: "Nenhum arquivo enviado." }; }
  const fileText = await file.text();
  try {
    const parsed = Papa.parse(fileText, { header: true, skipEmptyLines: true });
    if (parsed.errors.length > 0) { return { success: false, error: "Erro ao ler o arquivo CSV." }; }
    const patientsToInsert = parsed.data.map((row: any) => {
      const fullName = `${row['First Name'] || ''} ${row['Last Name'] || ''}`.trim();
      if (!fullName) return null;
      return { user_id: user.id, full_name: fullName, email: row['Email'] || null, phone: row['Phone'] || null };
    }).filter(Boolean);
    if (patientsToInsert.length === 0) { return { success: false, error: "Nenhum paciente válido encontrado." }; }
    const { error: insertError } = await supabase.from('patients').insert(patientsToInsert);
    if (insertError) { return { success: false, error: `Erro ao salvar: ${insertError.message}` }; }
    revalidatePath('/app/patients');
    return { success: true, count: patientsToInsert.length };
  } catch (e) { return { success: false, error: "Ocorreu um erro inesperado." }; }
}

export async function createPatient(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  if (!fullName || fullName.trim().length === 0) { return { success: false, error: "O nome completo é obrigatório." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const { error } = await supabase.from('patients').insert({ user_id: user.id, full_name: fullName, email: email || null, phone: phone || null });
  if (error) { return { success: false, error: "Não foi possível salvar o paciente." }; }
  revalidatePath('/app/patients');
  return { success: true, error: null };
}

export async function updatePatient(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const id = formData.get('patientId') as string;
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  if (!id) { return { success: false, error: "ID do paciente não encontrado." }; }
  if (!fullName || fullName.trim().length === 0) { return { success: false, error: "O nome completo é obrigatório." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const { error } = await supabase.from('patients').update({ full_name: fullName, email: email || null, phone: phone || null }).eq('id', id).eq('user_id', user.id);
  if (error) { return { success: false, error: "Não foi possível atualizar o paciente." }; }
  revalidatePath('/app/patients');
  revalidatePath(`/app/patients/${id}`);
  return { success: true, error: null, patientId: id };
}

export async function archivePatient(patientId: string) {
  const supabase = createSupabaseServerClient();
  if (!patientId) { return { success: false, error: "ID do paciente não encontrado." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const { error } = await supabase.from('patients').update({ status: 'archived' }).eq('id', patientId).eq('user_id', user.id);
  if (error) { return { success: false, error: "Não foi possível arquivar o paciente." }; }
  revalidatePath('/app/patients');
  revalidatePath(`/app/patients/${patientId}`);
  return { success: true, error: null };
}

// Ações de Notas Clínicas
export async function createClinicalNote(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const patientId = formData.get('patientId') as string;
  const content = formData.get('note-content') as string;
  if (!patientId) { return { success: false, error: "ID do paciente não foi enviado." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  if (!content || content.trim().length === 0) { return { success: false, error: "O conteúdo da nota não pode estar vazio." }; }
  const { error } = await supabase.from('clinical_notes').insert({ patient_id: patientId, user_id: user.id, content: content });
  if (error) { return { success: false, error: "Não foi possível salvar a nota." }; }
  revalidatePath(`/app/patients/${patientId}`);
  return { success: true, patientId: patientId, error: null };
}

export async function updateClinicalNote(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const noteId = formData.get('noteId') as string;
  const patientId = formData.get('patientId') as string;
  const content = formData.get('note-content') as string;
  if (!noteId || !patientId) { return { success: false, error: "IDs da nota ou do paciente não encontrados." }; }
  if (!content || content.trim().length === 0) { return { success: false, error: "O conteúdo da nota não pode estar vazio." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const { error } = await supabase.from('clinical_notes').update({ content: content }).eq('id', noteId).eq('user_id', user.id);
  if (error) { return { success: false, error: "Não foi possível salvar as alterações." }; }
  revalidatePath(`/app/patients/${patientId}`);
  revalidatePath(`/app/patients/${patientId}/notes/${noteId}`);
  return { success: true, error: null, patientId: patientId, noteId: noteId };
}

// Ações de Autenticação e Perfil
export async function signIn(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  if (!email || !password) { return { success: false, error: "Email e senha são obrigatórios." }; }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { return { success: false, error: "Credenciais inválidas." }; }
  return { success: true, error: null };
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const email = formData.get('email') as string;
  if (!email) { return { success: false, error: "O campo de email é obrigatório." }; }
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
  if (error) { console.error("Erro ao redefinir senha:", error); }
  return { success: true, message: "Se este e-mail estiver em nosso sistema, um link será enviado." };
}

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const fullName = formData.get('fullName') as string;
  const licenseNumber = formData.get('licenseNumber') as string;
  if (!fullName || fullName.trim().length === 0) { return { success: false, error: "O nome completo é obrigatório." }; }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Usuário não autenticado." }; }
  const { error } = await supabase.from('profiles').update({ full_name: fullName, license_number: licenseNumber || null }).eq('id', user.id);
  if (error) { return { success: false, error: "Não foi possível atualizar o perfil." }; }
  revalidatePath('/app/settings');
  return { success: true, error: null, message: "Perfil atualizado com sucesso!" };
}

// Ação do Stripe
export async function createStripePortalLink() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { throw new Error("Usuário não autenticado."); }
  const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single();
  if (!profile?.stripe_customer_id) { throw new Error("Cliente Stripe não encontrado."); }
  const { stripe } = await import('@/lib/stripe');
  const { url } = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/dashboard`,
  });
  redirect(url);
}