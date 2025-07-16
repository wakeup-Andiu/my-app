create table if not exists public.inscripciones (
  id uuid primary key default gen_random_uuid(),
  torneo_id uuid references public.torneos(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  inscrito_at timestamp with time zone default now(),
  unique (torneo_id, user_id)
);
