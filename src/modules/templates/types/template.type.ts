export interface TemplateResponse {
  status: string;
  message: string;
  data: Template;
}

export interface Template {
  id: number;
  name: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
