-- ═══════════════════════════════════════════════════
--  SALMA STORE — Corrección de Permisos
--  Ejecuta esto en: supabase.com → Tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════

-- 1. Dar permisos de uso del esquema público a la web
grant usage on schema public to anon, authenticated;

-- 2. Dar todos los privilegios sobre las tablas
grant all privileges on table public.products to anon, authenticated;
grant all privileges on table public.config to anon, authenticated;
grant all privileges on all sequences in schema public to anon, authenticated;

-- 3. Crear el "Bucket" de imágenes para que no salga Bad Request
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true) 
on conflict (id) do nothing;
