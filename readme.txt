Supabase

https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?database-method=dashboard&auth-store=async-storage

replace with your data src/services/supabase.ts

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

SQL

create table
  profiles (
    id uuid references auth.users not null primary key,
    updated_at timestamp with time zone,
    first_name text,
    last_name text,
    phone_number text,
    constraint first_name_length check (char_length(first_name) >= 3)
  );

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for insert
with
  check (auth.uid () = id);

create policy "Users can update own profile." on profiles
for update
  using (auth.uid () = id);

create function public.handle_new_user () returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
