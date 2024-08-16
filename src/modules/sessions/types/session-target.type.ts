export interface AssignTargetResponse {
  message: string;
  data: ScheduleSession;
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
