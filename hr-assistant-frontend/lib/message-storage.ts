export type HRMessage = {
  email: string;
  message: string;
};

const STORAGE_KEY = "hr_messages";

export function getMessages(): HRMessage[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveMessage(data: HRMessage) {
  const existing = getMessages();
  const updated = [...existing, data];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
