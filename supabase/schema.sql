-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked to Supabase Auth)
-- Stores extended user information for all roles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'teacher', 'student', 'parent')) not null,
  avatar_url text,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. CLASSES TABLE
create table public.classes (
  id uuid default uuid_generate_v4() primary key,
  name text not null, -- e.g. "Class 10"
  section text not null, -- e.g. "A"
  class_teacher_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.classes enable row level security;
create policy "Classes are viewable by everyone." on classes for select using (true);
create policy "Admins can manage classes" on classes for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- 3. STUDENTS TABLE
create table public.students (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique,
  class_id uuid references public.classes(id),
  parent_id uuid references public.profiles(id), -- Link to parent profile
  roll_number text,
  date_of_birth date,
  blood_group text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.students enable row level security;
create policy "Students viewable by all authenticated users" on students for select using (auth.role() = 'authenticated');
create policy "Admins can manage students" on students for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- 4. TEACHERS TABLE
create table public.teachers (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique,
  employee_id text unique,
  department text,
  subjects text[], -- Array of subjects taught
  joining_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.teachers enable row level security;
create policy "Teachers viewable by all authenticated users" on teachers for select using (auth.role() = 'authenticated');
create policy "Admins can manage teachers" on teachers for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- 5. ATTENDANCE TABLE
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  class_id uuid references public.classes(id) not null,
  date date not null,
  status text check (status in ('present', 'absent', 'late', 'half_day')) not null,
  recorded_by uuid references public.profiles(id), -- Usually teacher or admin
  remarks text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(student_id, date) -- Prevent duplicate attendance for same day
);

alter table public.attendance enable row level security;
create policy "Attendance viewable by authenticated users" on attendance for select using (auth.role() = 'authenticated');
create policy "Teachers and Admins can insert attendance" on attendance for insert with check (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('teacher', 'admin'))
);

-- 6. FEES TABLE
create table public.fees (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) on delete cascade not null,
  title text not null, -- e.g. "Term 1 Tuition Fee"
  amount numeric not null,
  due_date date not null,
  status text check (status in ('paid', 'pending', 'overdue')) default 'pending' not null,
  payment_date timestamp with time zone,
  transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.fees enable row level security;
create policy "Fees viewable by authenticated users" on fees for select using (auth.role() = 'authenticated');
create policy "Admins can manage fees" on fees for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- Setup Auth Triggers (Automatically create profile when a user signs up)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
