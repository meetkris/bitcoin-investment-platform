-- Allow public insert to properties (for seeding purposes)
create policy "Allow public insert to properties"
  on public.properties for insert
  with check ( true );

-- Also allow update/delete if needed, or just insert for now.
-- Ideally we would restrict this to service role, but for this dev setup anon key is used.
