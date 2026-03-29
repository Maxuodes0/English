create extension if not exists "pgcrypto";

create table if not exists categories (
  id text primary key,
  title text not null,
  arabic_title text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists words (
  id bigint generated always as identity primary key,
  word text not null unique,
  slug text not null unique,
  arabic_translation text not null,
  english_definition text not null,
  arabic_definition text not null,
  example_en text not null,
  example_ar text not null,
  level text not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1')),
  category text not null references categories(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id bigint not null references words(id) on delete cascade,
  attempts integer not null default 0,
  correct integer not null default 0,
  current_streak integer not null default 0,
  completed boolean not null default false,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, word_id)
);

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  word_id bigint not null references words(id) on delete cascade,
  mode text not null check (mode in ('multiple-choice', 'true-false', 'reverse', 'typing')),
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);

create index if not exists words_level_idx on words(level);
create index if not exists words_category_idx on words(category);
create index if not exists user_progress_user_idx on user_progress(user_id);
create index if not exists quiz_results_user_idx on quiz_results(user_id);

alter table user_progress enable row level security;
alter table quiz_results enable row level security;

create policy "Users can view their own progress"
on user_progress for select
using (auth.uid() = user_id);

create policy "Users can insert their own progress"
on user_progress for insert
with check (auth.uid() = user_id);

create policy "Users can update their own progress"
on user_progress for update
using (auth.uid() = user_id);

create policy "Users can view their own quiz results"
on quiz_results for select
using (auth.uid() = user_id);

create policy "Users can insert their own quiz results"
on quiz_results for insert
with check (auth.uid() = user_id);
