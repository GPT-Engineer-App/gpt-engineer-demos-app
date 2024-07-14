import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

/*
Types based on openapi.json:

### animals

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| name    | text | string | true     |
| species | text | string | true     |
| age     | int4 | number | true     |

*/