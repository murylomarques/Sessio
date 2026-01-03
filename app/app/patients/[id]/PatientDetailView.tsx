// /app/app/patients/[id]/PatientDetailView.tsx (no bloco de ações)

<div className="mt-4 flex items-center justify-start gap-x-3 sm:mt-0">
  <Link href={`/app/patients/${patientId}/new-appointment`} className="...">
    Agendar Sessão
  </Link>
  <Link href={`/app/patients/${patientId}/edit`} className="...">
    Editar
  </Link>
  <Link href={`/app/patients/${patientId}/new-note`} className="...">
    <PencilSquareIcon className="h-5 w-5" />
    Adicionar Nova Nota
  </Link>
</div>