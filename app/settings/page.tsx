const supabase = createSupabaseServerClient()

const { data: profile } = await supabase
  .from('profiles')
  .select('subscription_status')
  .single()
