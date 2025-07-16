create table if not exists public.torneos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  fecha date not null,
  juego text not null,
  descripcion text,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now()
);
