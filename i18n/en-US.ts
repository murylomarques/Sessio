// /i18n/en-US.ts - VERSÃO FINAL E COMPLETA

const enUS = {
  // --- MARKETING / LANDING PAGE ---
  header: {
    login: "Log In",
    cta: "Start Free Trial",
  },
  hero: {
    title: "Stop paying $99/mo for software you don't fully use.",
    subtitle: "Sessio is the essential EHR for solo therapists: Scheduling, Notes, and Payments. Nothing else.",
    cta: "Start free & import your data",
    microcopy: "No credit card required • Cancel anytime",
    importFrom: "Import your data with 1-click from:",
  },
  problem: {
    title: "Your software should simplify, not complicate.",
    problemsList: [
      "You're paying for insurance features you never use.",
      "Simple things like creating an invoice take too many clicks.",
      "The system feels more bloated with every update.",
      "You adapt your workflow to the software, not the other way around.",
    ],
    hook_start: "And you keep using it because the thought of migrating all your data",
    hook_end_bold: "feels like a nightmare.",
  },
  solution: {
    title: "Your migration, solved in minutes.",
    subtitle: "We know your biggest fear is losing data. That's why our importer does the heavy lifting for you.",
    step1_title: "1. Export from your EHR",
    step1_desc: "Generate the CSV file with your patients and notes from your old system.",
    step2_title: "2. Import into Sessio",
    step2_desc: "Drag and drop the file into our platform with a single click.",
    step3_title: "3. Ready to go",
    step3_desc: "All your charts and patients, organized and secure in Sessio.",
    security_title: "Security by design",
    security_desc: "Your notes are encrypted on your browser before they even reach our servers. Total privacy, by default."
  },
  pricing: {
    title: "Simple, transparent pricing.",
    subtitle: "One single plan with everything you need. No surprises.",
    monthly: "Monthly",
    annual: "Annual",
    save: "Save 2 months",
    cta: "Start your 7-day free trial",
    old_way: {
      title: "The Bloated Software",
      price: "$99/mo",
      features: [ "Insurance features you don't use", "Client limits on basic tiers", "Slow, bureaucratic support", "Steep learning curve" ],
    },
    new_way: {
      title: "Sessio: The Essential",
      price_month: "$29",
      price_year: "$290",
      billed_annually: "Billed annually",
      features: [ "Unlimited Patients", "Unlimited Session Notes", "Online Scheduling", "Payment Link Invoicing", "Data Importer", "Direct support with the founders" ],
    },
  },
  cta: {
    title: "Get your time back. Focus on what matters.",
    subtitle: "Less time on admin, more time with your clients.",
    testimonial_text: "I was paying a fortune for SimplePractice and using 10% of it. Migrating to Sessio took 5 minutes. It was an immediate relief, and I saved hours in the first week.",
    testimonial_author: "Dr. Ana L.",
    testimonial_role: "Psychotherapist, customer since 2025",
    button_text: "Start my free trial",
  },
  footer: {
    tagline: "The essential EHR for solo therapists. Less admin, more focus on your sessions.",
    product_title: "Product",
    pricing: "Pricing",
    how_it_works: "How it Works",
    company_title: "Company",
    about: "About Us",
    contact: "Contact",
    legal_title: "Legal",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    copyright: "All rights reserved.",
  },

  // --- AUTH & ONBOARDING FLOW ---
  signup: {
    title: "Create your free account",
    subtitle: "Start your 7-day trial. No credit card required.",
    email_label: "Email",
    password_label: "Password",
    cta_button: "Create my free account",
    terms_prefix: "By continuing, you agree to our",
    terms_link: "Terms of Service",
    privacy_link: "Privacy Policy",
    login_prompt: "Already have an account?",
    login_link: "Log In",
  },
  verify: {
    title: "Confirm your email",
    subtitle: "We've sent a confirmation link to your email address. Please click the link to activate your account.",
    spam_check: "Don't forget to check your spam folder.",
  },
  onboarding: {
    title: "Welcome to Sessio!",
    subtitle: "Let's get you set up. How would you like to start?",
    import_title: "Import existing data",
    import_desc: "Bring your patients and notes from another system. It's fast and secure.",
    manual_title: "Start from scratch",
    manual_desc: "Add your first patient manually in seconds.",
  },
  import: {
    title: "Import your data",
    subtitle: "Export your patients as a CSV file from your old system and upload it here.",
    upload_cta: "Click to upload a file",
    upload_subtext: "or drag and drop the CSV here",
    processing_title: "Processing your data...",
    processing_desc: "We are importing the file {fileName}. This might take a moment.",
    success_title: "Import complete!",
    success_desc: "{count} patients have been imported successfully. Redirecting...",
    error_title: "An error occurred",
    error_details_placeholder: "The CSV file format seems to be invalid. Please check if you have the correct file and try again.",
  },
  
  // --- IN-APP ---
  patients: {
    title: "Your Patients",
    subtitle: "View, search, and manage all your patients in one place.",
    add_patient_button: "Add Patient",
    table_header_name: "Name",
    table_header_email: "Email",
    table_header_status: "Status",
    table_action_view: "View Chart",
    status_active: "Active",
    status_archived: "Archived",
    empty_state_title: "No patients found",
    empty_state_subtitle: "How about adding the first one?",
    error_loading: "An error occurred while loading patients. Please try again later."
  },
  patientDetail: {
    email_fallback: "No email",
    phone_fallback: "No phone",
    edit_button: "Edit",
    add_note_button: "Add New Note",
    history_title: "Session History",
    view_edit_note_link: "View/Edit Note",
    empty_state_title: "No clinical notes found",
    loading: "Loading patients...",
    empty_state_subtitle: "Click 'Add New Note' to create this patient's first session."
  },
  noteDetail: {
    back_link: "Back to {patientName}'s chart",
    title: "Session Note",
    edit_button: "Edit",
    content_fallback: "The content for this note is empty."
  },
  newPatientForm: {
    title: "Add New Patient",
    subtitle: "Fill in the information below to create a new chart.",
    name_label: "Full Name",
    email_label: "Email",
    phone_label: "Phone",
    cancel_button: "Cancel",
    save_button: "Save Patient",
    saving_button: "Saving..."
  },
  editPatientForm: {
    title: "Edit Patient",
    subtitle: "Update the chart information for {patientName}.",
    cancel_button: "Cancel",
    save_button: "Save Changes",
    saving_button: "Saving..."
  },
  newNoteForm: {
    title: "New Session Note",
    subtitle: "Describe the session details. Your notes are saved securely.",
    content_label: "Note Content",
    placeholder: "Start writing here...",
    cancel_button: "Cancel",
    save_button: "Save Note",
    saving_button: "Saving..."
  },
  editNoteForm: {
    title: "Edit Session Note",
    subtitle: "Make the necessary changes to the note below.",
    cancel_button: "Cancel",
    save_button: "Save Changes",
    saving_button: "Saving..."
  },
    dashboard: {
    title: "Dashboard",
    subtitle: "Your daily overview.",
    today_schedule: "Today's Schedule",
    no_appointments: "You have no appointments today.",
    status_scheduled: "Scheduled",
    pending_payments: "Pending Payments",
    no_pending_payments: "No pending payments. Great job!",
    charge: "Generate Invoice",
  },

};

export default enUS;