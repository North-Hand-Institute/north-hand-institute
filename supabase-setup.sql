-- Run this in your Supabase SQL Editor

-- Courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  description text,
  audience text default 'Licensed Massage Therapists',
  format text default 'In-Person Intensive',
  ce_hours integer,
  active boolean default true,
  created_at timestamptz default now()
);

-- Events table (scheduled instances of courses)
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade,
  location_name text,
  location_city text,
  location_state text,
  date date,
  price numeric(10,2),
  spots_total integer,
  spots_remaining integer,
  notes text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Site content (bio, tagline, etc.)
create table if not exists site_content (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text
);

-- Seed initial content
insert into site_content (key, value) values
  ('bio_main', 'For over twelve years, Michael Corcoran has been refining the practice of adapting meridian-based massage for the treatment table — bringing the depth and precision of traditional Shiatsu into the modern clinical setting.'),
  ('bio_secondary', 'His clients consistently report profound results, and that effectiveness is what drives him to share this work with fellow therapists. North Hand Institute was founded to give Licensed Massage Therapists access to training that is both rigorously grounded in tradition and immediately applicable in practice.'),
  ('hero_tagline', 'Professional continuing education for Licensed Massage Therapists — rooted in meridian-based tradition, adapted for the modern treatment table.'),
  ('quote', 'The body speaks in patterns. Learning to listen — through meridian, muscle, and bone — transforms what we can offer our clients.')
on conflict (key) do nothing;

-- Seed first course
insert into courses (title, subtitle, description, ce_hours) values
  (
    'Shiatsu Tablework Intensive',
    'Upper Body — Supine',
    'A focused, hands-on intensive exploring the translation of traditional Shiatsu technique to standard table practice. This course addresses meridian pathways of the upper body in the supine position — integrating Eastern energy principles with Western bodywork ergonomics. You will leave with a refined, immediately applicable set of techniques that complement any existing massage practice.',
    5
  );

-- Seed example event
insert into events (course_id, location_name, location_city, location_state, date, price, spots_total, spots_remaining, notes)
select id, 'Sol Spa', 'Cape Cod', 'MA', '2025-09-13', 125.00, 12, 12, 'Hosted graciously by Sol Spa'
from courses limit 1;

-- Enable public read access
alter table courses enable row level security;
alter table events enable row level security;
alter table site_content enable row level security;

create policy "Public read courses" on courses for select using (true);
create policy "Public read events" on events for select using (true);
create policy "Public read content" on site_content for select using (true);
create policy "All access courses" on courses for all using (true);
create policy "All access events" on events for all using (true);
create policy "All access content" on site_content for all using (true);
