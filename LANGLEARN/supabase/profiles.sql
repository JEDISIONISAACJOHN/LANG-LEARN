-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  email text,
  preferred_language text default 'en',
  learning_language text,
  goal text,
  level text default 'beginner',
  daily_goal integer default 10,
  age_range text,
  assessment_score integer,
  has_completed_assessment boolean default false,
  learning_plan jsonb,
  xp integer default 0,
  gems integer default 100,
  hearts integer default 5,
  streak integer default 0,
  last_active_date date,
  completed_lessons jsonb default '[]'::jsonb,
  language_progress jsonb default '{}'::jsonb,
  legendary_completed jsonb default '[]'::jsonb,
  vocabulary jsonb default '{}'::jsonb,
  achievements jsonb default '[]'::jsonb,
  settings jsonb default '{"audio": true, "soundFx": true, "speaking": true}'::jsonb,
  active_quests jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create a trigger to automatically create a profile for new users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, new.raw_user_meta_data->>'name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
