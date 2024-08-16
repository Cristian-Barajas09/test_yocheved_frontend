import { API_CONSTANTS } from "@/shared/constants/api.constants";
import type {
  CreateStudent,
  AvailabilityResponseByStudent,
  StudentsResponse,
} from "@/modules/students/types/students.types";
import { type StudentResponse } from "../types/student.types";
import { getToken } from "@/shared/services/auth.service";

const { API_URL, API_VERSION, STUDENTS } = API_CONSTANTS;

export async function getStudents(
  page = 1,
  limit = 10
): Promise<StudentsResponse> {
  const token = await getToken();

  const response = await fetch(
    `${API_URL}/${API_VERSION}${STUDENTS}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
}

export async function getStudentById(id: string): Promise<StudentResponse> {
  const token = await getToken();
  const response = await fetch(`${API_URL}/${API_VERSION}${STUDENTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createStudent(
  student: CreateStudent
): Promise<StudentResponse> {
  const token = await getToken();
  const response = await fetch(`${API_URL}/${API_VERSION}${STUDENTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...student }),
  });
  return response.json();
}

export async function getAvailitibyStudent(
  id: string
): Promise<AvailabilityResponseByStudent> {
  const token = await getToken();
  const response = await fetch(
    `${API_URL}/${API_VERSION}${STUDENTS}/${id}/availability`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
}

export async function removeAvailitibyStudent(
  id: string,
  day: string
): Promise<AvailabilityResponseByStudent> {
  const token = await getToken();
  const response = await fetch(
    `${API_URL}/${API_VERSION}${STUDENTS}/${id}/availability/${day}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}

export async function addAvailitibyStudent(
  id: string,
  day: string
): Promise<AvailabilityResponseByStudent> {
  const token = await getToken();
  const response = await fetch(
    `${API_URL}/${API_VERSION}${STUDENTS}/${id}/availability`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ day }),
    }
  );
  return await response.json();
}
