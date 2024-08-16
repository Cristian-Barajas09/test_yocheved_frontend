import { defineStore } from "pinia";
import {
  getSessions,
  createSession,
  loadSessionByDocx,
  getSessionById,
  getReportsByStudent,
  assingTargetToSession,
} from "../services/session.service";
import type { Session, SessionByCreate } from "../types/sessions.type";
import type { Session as SessionById } from "../types/session.type";
import type { GetReportsRequest } from "../types/session-report.type";

export const useSessionStore = defineStore("sessions", {
  state: () => ({
    sessions: [] as Session[],
    session: {} as SessionById,
    reports: {} as Blob,
    page: 1,
    totalPage: 1,
    limit: 5,
  }),
  actions: {
    async getSessions() {
      const { data } = await getSessions(this.page, this.limit);

      this.$patch({
        sessions: data.data,
        page: data.current_page,
        totalPage: data.last_page,
      });
    },
    async getSessionById(sessionId: number) {
      try {
        const { data } = await getSessionById(sessionId);
        this.$patch({
          session: data,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async assingTargetToSession(scheduleSessionId: number, target: number) {
      try {
        const { data } = await assingTargetToSession(scheduleSessionId, target);
        await this.getSessionById(data.session_id);
      } catch (error) {
        console.error(error);
      }
    },
    async createSession(session: SessionByCreate) {
      try {
        const { data } = await createSession(session);
        this.$patch({
          sessions: [...this.sessions, data.data],
        });
      } catch (error) {
        console.error(error);
      }
    },
    async loadSessionByDocx(file: File, studentId: number) {
      try {
        await loadSessionByDocx(file, studentId);
        await this.getSessions();
      } catch (error) {
        console.error(error);
      }
    },

    async getReportsByStudent(request: GetReportsRequest) {
      try {
        const files = await getReportsByStudent(request);
        this.$patch({
          reports: files,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async downloadReports() {
      console.log(this.reports);
      const url = window.URL.createObjectURL(this.reports);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reports.zip";
      a.click();
    },
  },
});
