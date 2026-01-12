"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Papa from "papaparse";

/* =========================================================
   🏥 PACIENTES
========================================================= */

export async function importPatientsFromCSV(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "Nenhum arquivo enviado." };
  }

  const fileText = await file.text();

  const parsed = Papa.parse(fileText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    return { success: false, error: "Erro ao ler o arquivo CSV." };
  }

  const patientsToInsert = parsed.data
    .map((row: any) => {
      const fullName = `${row["First Name"] || ""} ${row["Last Name"] || ""}`.trim();
      if (!fullName) return null;

      return {
        user_id: user.id,
        full_name: fullName,
        email: row["Email"] || null,
        phone: row["Phone"] || null,
      };
    })
    .filter(Boolean);

  if (patientsToInsert.length === 0) {
    return { success: false, error: "Nenhum paciente válido encontrado." };
  }

  const { error } = await supabase.from("patients").insert(patientsToInsert);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/app/patients");
  return { success: true, count: patientsToInsert.length };
}

export async function createPatient(_: any, formData: FormData) {
  const supabase = createSupabaseServerClient();

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!fullName?.trim()) {
    return { success: false, error: "O nome completo é obrigatório." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const { error } = await supabase.from("patients").insert({
    user_id: user.id,
    full_name: fullName,
    email: email || null,
    phone: phone || null,
  });

  if (error) {
    return { success: false, error: "Não foi possível salvar o paciente." };
  }

  revalidatePath("/app/patients");
  return { success: true };
}

export async function updatePatient(_: any, formData: FormData) {
  const supabase = createSupabaseServerClient();

  const id = formData.get("patientId") as string;
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!id || !fullName?.trim()) {
    return { success: false, error: "Dados inválidos." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const { error } = await supabase
    .from("patients")
    .update({
      full_name: fullName,
      email: email || null,
      phone: phone || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: "Erro ao atualizar paciente." };
  }

  revalidatePath("/app/patients");
  revalidatePath(`/app/patients/${id}`);
  return { success: true };
}

export async function archivePatient(patientId: string) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !patientId) {
    return { success: false, error: "Dados inválidos." };
  }

  const { error } = await supabase
    .from("patients")
    .update({ status: "archived" })
    .eq("id", patientId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: "Erro ao arquivar paciente." };
  }

  revalidatePath("/app/patients");
  return { success: true };
}

/* =========================================================
   📝 NOTAS CLÍNICAS
========================================================= */

export async function createClinicalNote(_: any, formData: FormData) {
  const supabase = createSupabaseServerClient();

  const patientId = formData.get("patientId") as string;
  const content = formData.get("note-content") as string;

  if (!patientId || !content?.trim()) {
    return { success: false, error: "Dados inválidos." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const { error } = await supabase.from("clinical_notes").insert({
    patient_id: patientId,
    user_id: user.id,
    content,
  });

  if (error) {
    return { success: false, error: "Erro ao salvar nota." };
  }

  revalidatePath(`/app/patients/${patientId}`);
  return { success: true };
}

export async function autoSaveClinicalNote(data: {
  noteId: string;
  patientId: string;
  content: string;
}) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("clinical_notes")
    .update({
      content: data.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.noteId)
    .eq("patient_id", data.patientId);

  if (error) {
    throw new Error("Erro ao salvar nota");
  }

  return { success: true };
}

/* =========================================================
   👤 PERFIL
========================================================= */

export async function updateProfile(_: any, formData: FormData) {
  const supabase = createSupabaseServerClient();

  const fullName = formData.get("fullName") as string;
  const licenseNumber = formData.get("licenseNumber") as string;

  if (!fullName?.trim()) {
    return { success: false, error: "Nome obrigatório." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      license_number: licenseNumber || null,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Erro ao atualizar perfil." };
  }

  revalidatePath("/app/settings");
  return { success: true };
}

/* =========================================================
   💳 STRIPE (CORRETO PARA TESTE/LIVE)
========================================================= */

export async function createStripePortalLink() {
  const supabase = createSupabaseServerClient();
  const { stripe } = await import("@/lib/stripe");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    throw new Error("Cliente Stripe não encontrado.");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings`,
  });

  redirect(session.url);
}

export async function createCheckoutSession() {
  const supabase = createSupabaseServerClient();
  const { stripe } = await import("@/lib/stripe");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: profile?.full_name || user.email!,
      metadata: { userId: user.id },
    });

    customerId = customer.id;

    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings?canceled=true`,
  });

  redirect(session.url!);
}
