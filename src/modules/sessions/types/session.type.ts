export interface SessionResponse {
  data: Session;
}

export interface Session {
  id: number;
  user_id: number;
  student_id: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  student: Student;
  user: User;
  schedule_sessions: ScheduleSession[];
}

export interface ScheduleSession {
  id: number;
  start: Date;
  end: Date;
  target: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
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
  birth_date: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
}
