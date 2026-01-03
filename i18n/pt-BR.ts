// /i18n/pt-BR.ts - VERSÃO FINAL E CORRIGIDA

const ptBR = {
  // --- MARKETING / LANDING PAGE ---
  header: {
    login: "Entrar",
    cta: "Começar Teste Grátis",
  },
  hero: {
    title: "Chega de pagar R$499/mês por um software que você não usa.",
    subtitle: "Sessio é o EHR essencial para terapeutas solo: Agendamento, Prontuário e Recebimento. Nada mais.",
    cta: "Comece grátis e importe seus dados",
    microcopy: "Sem cartão de crédito • Cancele quando quiser",
    importFrom: "Importe seus dados com 1 clique de:",
  },
  problem: {
    title: "Seu software deveria simplificar, não complicar.",
    problemsList: [
      "Você paga por funções de convênio que nunca usa.",
      "Gerar uma cobrança simples exige cliques demais.",
      "O sistema parece mais complexo a cada atualização.",
      "Você adapta sua rotina ao software, e não o contrário.",
    ],
    hook_start: "E você continua usando porque a ideia de migrar todos os seus dados",
    hook_end_bold: "parece um pesadelo.",
  },
  solution: {
    title: "Sua migração, resolvida em minutos.",
    subtitle: "Sabemos que seu maior medo é perder dados. Por isso, nosso importador faz o trabalho pesado por você.",
    step1_title: "1. Exporte do seu EHR",
    step1_desc: "Gere o arquivo CSV com seus pacientes e notas no seu sistema antigo.",
    step2_title: "2. Importe no Sessio",
    step2_desc: "Arraste o arquivo para a nossa plataforma com um único clique.",
    step3_title: "3. Pronto para usar",
    step3_desc: "Todos os seus prontuários e pacientes, organizados e seguros no Sessio.",
    security_title: "Segurança em primeiro lugar",
    security_desc: "Suas notas são criptografadas no seu navegador antes mesmo de chegarem aos nossos servidores. Privacidade total, por padrão."
  },
  pricing: {
    title: "Preço simples e transparente.",
    subtitle: "Um único plano com tudo que você precisa, sem surpresas.",
    monthly: "Mensal",
    annual: "Anual",
    save: "Economize 2 meses",
    cta: "Começar teste grátis de 7 dias",
    old_way: {
      title: "O software complicado",
      price: "R$499/mês",
      features: [ "Funções de convênio que você não usa", "Limite de clientes no plano básico", "Suporte lento e burocrático", "Curva de aprendizado longa" ],
    },
    new_way: {
      title: "Sessio: O Essencial",
      price_month: "R$59",
      price_year: "R$590",
      billed_annually: "Cobrado anualmente",
      features: [ "Pacientes ilimitados", "Notas de prontuário ilimitadas", "Agendamento online", "Cobrança via link de pagamento", "Importador de dados", "Suporte direto com os fundadores" ],
    },
  },
  cta: {
    title: "Recupere seu tempo. Foque no que importa.",
    subtitle: "Menos tempo com burocracia, mais tempo com seus pacientes.",
    testimonial_text: "Eu pagava uma fortuna pelo SimplePractice e usava 10% dele. A migração para o Sessio demorou 5 minutos. Foi um alívio imediato e economizei horas na primeira semana.",
    testimonial_author: "Dr. Ana L.",
    testimonial_role: "Psicoterapeuta, cliente desde 2025",
    button_text: "Começar meu teste grátis",
  },
  footer: {
    tagline: "O EHR essencial para terapeutas solo. Menos burocracia, mais foco na sessão.",
    product_title: "Produto",
    pricing: "Preço",
    how_it_works: "Como Funciona",
    company_title: "Empresa",
    about: "Sobre Nós",
    contact: "Contato",
    legal_title: "Legal",
    terms: "Termos de Serviço",
    privacy: "Política de Privacidade",
    copyright: "Todos os direitos reservados.",
  },

  // --- FLUXO DE AUTENTICAÇÃO E ONBOARDING ---
  signup: {
    title: "Crie sua conta grátis",
    subtitle: "Comece seu teste de 7 dias. Não pedimos cartão de crédito.",
    email_label: "Email",
    name_label: "Nome Completo",
    password_label: "Senha",
    cta_button: "Criar minha conta grátis",
    terms_prefix: "Ao continuar, você concorda com nossos",
    terms_link: "Termos de Serviço",
    privacy_link: "Política de Privacidade",
    login_prompt: "Já tem uma conta?",
    login_link: "Entrar",
  },
  verify: {
    title: "Confirme seu e-mail",
    subtitle: "Enviamos um link de confirmação para o seu endereço de e-mail. Por favor, clique no link para ativar sua conta.",
    spam_check: "Não se esqueça de verificar sua caixa de spam.",
  },
  onboarding: {
    title: "Bem-vindo(a) ao Sessio!",
    subtitle: "Vamos começar. Como você prefere configurar sua conta?",
    import_title: "Importar dados existentes",
    import_desc: "Traga seus pacientes e prontuários de outro sistema. É rápido e seguro.",
    manual_title: "Começar do zero",
    manual_desc: "Adicione seu primeiro paciente manualmente em segundos.",
  },
  import: {
    title: "Importe seus dados",
    subtitle: "Exporte seus pacientes como um arquivo CSV do seu sistema antigo e envie aqui.",
    upload_cta: "Clique para enviar um arquivo",
    upload_subtext: "ou arraste e solte o CSV aqui",
    processing_title: "Processando seus dados...",
    processing_desc: "Estamos importando o arquivo {fileName}. Isso pode levar alguns instantes.",
    success_title: "Importação concluída!",
    success_desc: "{count} pacientes foram importados com sucesso. Redirecionando...",
    error_title: "Ocorreu um erro",
    error_details_placeholder: "O formato do arquivo CSV parece ser inválido. Por favor, verifique se é o arquivo correto e tente novamente.",
  },

  // --- DENTRO DA APLICAÇÃO ---
  patients: {
    title: "Seus Pacientes",
    subtitle: "Veja, busque e gerencie todos os seus pacientes em um só lugar.",
    add_patient_button: "Adicionar Paciente",
    table_header_name: "Nome",
    table_header_email: "Email",
    table_header_status: "Status",
    table_action_view: "Ver Prontuário",
    status_active: "Ativo",
    status_archived: "Arquivado",
    empty_state_title: "Nenhum paciente encontrado",
    empty_state_subtitle: "Que tal adicionar o primeiro?",
    import_button: "Importar",
    error_loading: "Ocorreu um erro ao carregar os pacientes. Tente novamente mais tarde."
  },
  patientDetail: {
    email_fallback: "Sem email",
    phone_fallback: "Sem telefone",
    edit_button: "Editar",
    add_note_button: "Adicionar Nova Nota",
    history_title: "Histórico de Sessões",
    view_edit_note_link: "Ver/Editar Nota",
    empty_state_title: "Nenhuma nota clínica encontrada",
    loading: "Carregando pacientes...",
    empty_state_subtitle: "Clique em 'Adicionar Nova Nota' para criar a primeira sessão deste paciente."
  },
  noteDetail: {
    back_link: "Voltar para o prontuário de {patientName}",
    title: "Nota de Sessão",
    edit_button: "Editar",
    content_fallback: "O conteúdo desta nota está vazio."
  },
  newPatientForm: {
    title: "Adicionar Novo Paciente",
    subtitle: "Preencha as informações abaixo para criar um novo prontuário.",
    name_label: "Nome Completo",
    email_label: "Email",
    phone_label: "Telefone",
    cancel_button: "Cancelar",
    save_button: "Salvar Paciente",
    saving_button: "Salvando..."
  },
  editPatientForm: {
    title: "Editar Paciente",
    subtitle: "Atualize as informações do prontuário de {patientName}.",
    cancel_button: "Cancelar",
    save_button: "Salvar Alterações",
    saving_button: "Salvando..."
  },
  newNoteForm: {
    title: "Nova Nota de Sessão",
    subtitle: "Descreva os detalhes da sessão. Suas anotações são salvas com segurança.",
    content_label: "Conteúdo da Nota",
    placeholder: "Comece a escrever aqui...",
    cancel_button: "Cancelar",
    save_button: "Salvar Nota",
    saving_button: "Salvando..."
  },
  editNoteForm: {
    title: "Editar Nota de Sessão",
    subtitle: "Faça as alterações necessárias no conteúdo da nota abaixo.",
    cancel_button: "Cancelar",
    save_button: "Salvar Alterações",
    saving_button: "Salvando..."
  },
    dashboard: {
    title: "Dashboard",
    subtitle: "Seu resumo do dia.",
    today_schedule: "Agenda de Hoje",
    no_appointments: "Você não tem sessões agendadas para hoje.",
    status_scheduled: "Agendado",
    pending_payments: "Pagamentos Pendentes",
    no_pending_payments: "Nenhum pagamento pendente. Ótimo trabalho!",
    charge: "Gerar Cobrança",
  },
  settings: {
  title: "Configurações",
  subtitle: "Gerencie suas informações e assinatura.",

  // Perfil
  profile_title: "Seu Perfil",
  name_label: "Nome Completo",
  license_label: "Nº de Licença (CRP, etc.)",
  save_button: "Salvar Alterações",
  saving_button: "Salvando...",
  success_message: "Perfil atualizado!",

  // Assinatura
  subscription_title: "Sua Assinatura",
  plan_label: "Plano",
  plan_name: "Plano Solo",
  status_label: "Status",
  status_active: "Ativo",
  next_billing_date_label: "Próxima cobrança",
  manage_subscription_button: "Gerenciar Assinatura",
  loading_portal_button: "Carregando...",
  portal_description:
    "Você pode gerenciar sua assinatura, forma de pagamento ou cancelar a qualquer momento.",

  // Período de teste
  trial_title: "Você está em um período de teste",
  trial_description:
    "Faça o upgrade para o Plano Solo para continuar usando o Sessio após o término do seu teste.",
  upgrade_button: "Fazer upgrade agora",

  // Senha
  change_password: "Trocar senha",
  show_change_password_form: "Alterar minha senha",
  new_password: "Nova senha",
  confirm_password: "Confirmar nova senha",
  change_password_button: "Salvar nova senha",
  passwords_do_not_match: "As senhas não coincidem",
  password_updated_success: "Senha atualizada com sucesso!",
},


  navigation: {
    dashboard: "Dashboard",
    patients: "Pacientes",
    settings: "Configurações",
    sign_out: "Sair"
  },
    login: {
    title: "Acesse sua conta",
    subtitle: "Bem-vindo(a) de volta!",
    email_label: "Email",
    password_label: "Senha",
    cta_button: "Entrar",
    loading_button: "Entrando...",
    signup_prompt: "Não tem uma conta?",
    signup_link: "Cadastre-se",
    forgot_password_link: "Esqueceu sua senha?",
  },
  forgotPassword: {
    title: "Redefinir sua senha",
    subtitle: "Digite seu e-mail e enviaremos um link para você voltar a acessar sua conta.",
    email_label: "Email",
    cta_button: "Enviar link de redefinição",
    loading_button: "Enviando...",
    success_message: "Se um usuário com este e-mail existir, um link de redefinição foi enviado.",
    back_to_login: "Voltar para o login",
  },
  newAppointmentForm: {
    title: "Novo Agendamento",
    subtitle: "Preencha os detalhes para agendar uma nova sessão para {patientName}.",
    date_label: "Data",
    start_time_label: "Hora de Início",
    end_time_label: "Hora de Fim",
    cancel_button: "Cancelar",
    save_button: "Salvar Agendamento",
    saving_button: "Salvando..."
  },
  calendar: {
    title: "Agenda",
    subtitle: "Visualize, agende e gerencie suas sessões.",
    header: "Calendário de atendimentos",
    event_click_error: "Paciente não associado a este agendamento.",
    date_click_alert: "Para criar um novo agendamento, vá para a página de um paciente e clique em 'Agendar Sessão'."
  },
};

export default ptBR;