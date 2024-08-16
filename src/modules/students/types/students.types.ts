export interface StudentsResponse {
  data: Data;
}

export interface Data {
  current_page: number;
  data: Student[];
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

export interface Student {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  email: string;
  birth_date: Date;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface AvailabilityResponseByStudent {
  data: AvailabilityByStudent;
}

export interface AvailabilityByStudent {
  [key: string]: boolean;
}

export interface CreateStudent {
  name: string;
  middle_name: string;
  last_name: string;
  email: string;
  birth_date: string;
}
