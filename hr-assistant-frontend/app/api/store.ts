export type HRMessage = {
  sessionId: string;
  email?: string;
  message: string;
};

export const messages: HRMessage[] = [];