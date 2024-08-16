import { API_CONSTANTS } from "@/shared/constants/api.constants";
import type { TemplatesResponse } from "../types/templates.type";
import { getToken } from "@/shared/services/auth.service";
import type { TemplateResponse } from "../types/template.type";

const { API_URL, API_VERSION } = API_CONSTANTS;

export async function getTemplates(): Promise<TemplatesResponse> {
  const token = await getToken();
  const response = await fetch(`${API_URL}/${API_VERSION}/templates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()) as TemplatesResponse;

  return data;
}

export async function getTemplate(id: string) {
  const token = await getToken();
  const response = await fetch(`${API_URL}/${API_VERSION}/templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()) as TemplateResponse;

  return data;
}
