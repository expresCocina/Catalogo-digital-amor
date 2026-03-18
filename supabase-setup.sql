-- ═══════════════════════════════════════════════════
--  SALMA STORE — Supabase SQL Setup
--  Ejecuta esto en: supabase.com → Tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════

-- 1. Tabla de productos
create table if not exists products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text,
  price           numeric(12,0) not null,
  original_price  numeric(12,0),           -- Para precio con descuento
  category        text not null default 'Otros',
  status          text not null default 'active' check (status in ('active','sold_out')),
  sizes           text[] default '{}',
  colors          jsonb default '[]',       -- [{ "hex": "#AABBCC", "name": "Rosa" }]
  images          text[] default '{}',      -- URLs de Supabase Storage
  sku             text,                     -- Código de referencia/inventario
  featured        boolean default false,    -- Marcar como favorito
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 2. Tabla de configuración de la tienda
create table if not exists config (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,    -- 'store_name', 'whatsapp', etc.
  value       text not null default '',
  updated_at  timestamptz default now()
);

-- Insertar config por defecto
insert into config (key, value) values
  ('store_name', 'Salma Store'),
  ('whatsapp', ''),
  ('slogan', 'Moda con personalidad · Hecho con amor'),
  ('instagram', ''),
  ('facebook', ''),
  ('tiktok', '')
on conflict (key) do nothing;

-- 3. Actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger set_config_updated_at
  before update on config
  for each row execute function update_updated_at();

-- 4. Row Level Security (RLS)
alter table products enable row level security;
alter table config enable row level security;

-- Lectura pública (catálogo visible para todos)
create policy "Public read products"
  on products for select using (true);

create policy "Public read config"
  on config for select using (true);

-- Escritura solo para usuarios autenticados (admin)
create policy "Auth write products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Auth write config"
  on config for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Bucket de Storage para imágenes
-- (Ejecutar en: Storage → Create bucket)
-- Nombre: product-images
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Política de storage (pública para lectura)
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Auth upload images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Auth delete images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════
--  Producto de ejemplo para probar
-- ═══════════════════════════════════════════════════
insert into products (name, description, price, original_price, category, status, sizes, colors, featured)
values (
  'Camiseta Alma Libre',
  'Camiseta de algodón 100% con diseño exclusivo. Tela suave y fresca, perfecta para el día a día.',
  45000,
  60000,
  'Camisetas',
  'active',
  array['S','M','L','XL'],
  '[{"hex":"#E8A0B0","name":"Rosa"},{"hex":"#FFFFFF","name":"Blanco"},{"hex":"#5C2D3E","name":"Vino"}]'::jsonb,
  true
);
