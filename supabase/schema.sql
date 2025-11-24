-- Enable pgcrypto for UUID generation (run once per database)
create extension if not exists "pgcrypto";

-- Cart storage --------------------------------------------------------------
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null default '[]'::jsonb,
  total_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint unique,
  session_id text not null unique,
  email text,
  currency text default 'eur',
  total_cents integer not null default 0,
  items jsonb not null default '[]'::jsonb,
  form_status text not null default 'todo',
  form_sections jsonb not null default '{}'::jsonb,
  form_payload jsonb not null default '{}'::jsonb,
  form_access_token text,
  form_updated_at timestamptz,
  created_at timestamptz not null default now()
);

comment on column public.orders.order_number is 'Sequential number displayed to the customer (ex: #001).';

create table if not exists public.order_counters (
  id int primary key default 1,
  next_value bigint not null default 1,
  updated_at timestamptz not null default now()
);

insert into public.order_counters (id, next_value)
values (1, 1)
on conflict (id) do nothing;

create or replace function public.create_order_with_number(
  p_session_id text,
  p_email text default null,
  p_currency text default 'eur',
  p_total_cents integer default 0,
  p_items jsonb default '[]'::jsonb,
  p_form_status text default 'progress',
  p_form_sections jsonb default '{}'::jsonb,
  p_form_payload jsonb default '{}'::jsonb,
  p_form_access_token text default null
)
returns public.orders
language plpgsql
security definer
as $$
declare
  reserved_number bigint;
  new_order public.orders;
begin
  update public.order_counters
  set next_value = next_value + 1,
      updated_at = now()
  where id = 1
  returning next_value - 1 into reserved_number;

  insert into public.orders (
    session_id,
    order_number,
    email,
    currency,
    total_cents,
    items,
    form_status,
    form_sections,
    form_payload,
    form_access_token
  )
  values (
    p_session_id,
    reserved_number,
    p_email,
    coalesce(nullif(p_currency, ''), 'eur'),
    coalesce(p_total_cents, 0),
    coalesce(p_items, '[]'::jsonb),
    coalesce(nullif(p_form_status, ''), 'progress'),
    coalesce(p_form_sections, '{}'::jsonb),
    coalesce(p_form_payload, '{}'::jsonb),
    p_form_access_token
  )
  returning * into new_order;

  return new_order;
end;
$$;

-- Catalogue synchronisé -----------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  image text,
  category text,
  default_rating numeric not null default 5,
  default_reviews integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Avis clients ---------------------------------------------------------------
create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null references public.products(slug) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create unique index if not exists product_reviews_order_product_idx
  on public.product_reviews(order_id, product_slug);

-- Vue agrégée pour récupérer les notes dynamiques ---------------------------
create or replace view public.product_rating_stats as
select
  p.slug,
  p.title,
  p.image,
  p.category,
  p.default_rating,
  p.default_reviews,
  coalesce(sum(r.rating), 0) as review_sum,
  count(r.id) as review_count,
  (coalesce(p.default_reviews, 0) + count(r.id)) as total_reviews_count,
  case
    when (coalesce(p.default_reviews, 0) + count(r.id)) = 0 then coalesce(p.default_rating, 5)
    else (coalesce(p.default_rating, 0) * coalesce(p.default_reviews, 0) + coalesce(sum(r.rating), 0))::numeric
         / nullif(coalesce(p.default_reviews, 0) + count(r.id), 0)
  end as average_rating
from public.products p
left join public.product_reviews r on r.product_slug = p.slug
group by p.id;

-- S'assurer de recharger le cache PostgREST après migration ------------------
notify pgrst, 'reload schema';
