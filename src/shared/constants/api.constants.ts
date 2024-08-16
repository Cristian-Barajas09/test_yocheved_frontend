type TApiConstants = {
  API_URL: string;
  API_VERSION: string;
  STUDENTS: string;
};

export const API_CONSTANTS: TApiConstants = {
  API_URL: import.meta.env.VITE_API_URL,
  API_VERSION: import.meta.env.VITE_API_VERSION,
  STUDENTS: "/students",
};
