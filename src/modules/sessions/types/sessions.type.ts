export interface SessionsResponse {
  data: Data;
}

export interface Data {
  current_page: number;
  data: Session[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Session {
  id: number;
  user_id: number;
  student_id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  student: Student;
  user: User;
  schedule_sessions: ScheduleSession[];
}

export interface ScheduleSession {
  id: number;
  start: string;
  end: string;
  target: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  recurring: number;
  duration: number;
  session_id: number;
}

export interface Student {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  email: string;
  birth_date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface SessionByCreate {
  session_start: string;
  time: string;
  duration: number;
  student_id: number;
}
