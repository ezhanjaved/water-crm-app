import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://yepkgmxbijeguqtiiguy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcGtnbXhiaWplZ3VxdGlpZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MzQyMDgsImV4cCI6MjA2OTMxMDIwOH0._6eo7HHeoI5-zq050yN9nMIPFJmjqvyl3HUiKnWBbxY');

export default supabase