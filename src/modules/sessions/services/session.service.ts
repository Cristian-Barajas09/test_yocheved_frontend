import { API_CONSTANTS } from "@/shared/constants/api.constants";
import { getToken } from "@/shared/services/auth.service";
import { json } from "@/shared/utils/req";

import type { SessionByCreate, SessionsResponse } from "../types/sessions.type";
import type { SessionResponse } from "../types/session.type";
import type { GetReportsRequest } from "../types/session-report.type";
import type { AssignTargetResponse } from "../types/session-target.type";

const { API_URL, API_VERSION } = API_CONSTANTS;

export async function getSessions(
  page: number,
  limit: number
): Promise<SessionsResponse> {
  const token = await getToken();

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const resp = await fetch(`${API_URL}/${API_VERSION}/sessions?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await resp.json()) as SessionsResponse;

  return data;
}
export async function getSessionById(
  sessionId: number
): Promise<SessionResponse> {
  const token = await getToken();
  const resp = await fetch(`${API_URL}/${API_VERSION}/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
}
export async function createSession(session: SessionByCreate) {
  const token = await getToken();
  const resp = await fetch(`${API_URL}/${API_VERSION}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: json(session),
  });

  return resp.json();
}
export async function assingTargetToSession(
  scheduleSessionId: number,
  target: number
): Promise<AssignTargetResponse> {
  const token = await getToken();
  const resp = await fetch(
    `${API_URL}/${API_VERSION}/sessions/${scheduleSessionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: json({ target }),
    }
  );

  return resp.json();
}

export async function loadSessionByDocx(file: File, studentId: number) {
  const token = await getToken();
  const formData = new FormData();
  formData.append("docx", file);

  const resp = await fetch(
    `${API_URL}/${API_VERSION}/students/${studentId}/upload/msdocx`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return resp.json();
}

export async function getReportsByStudent(
  request: GetReportsRequest
): Promise<Blob> {
  const token = await getToken();

  const resp = await fetch(`${API_URL}/${API_VERSION}/reports/template/1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: json(request),
  });

  return resp.blob();
}
