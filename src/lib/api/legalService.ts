import { BASE_URL } from "@/config";

export const legalService = {
  getTerms: async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/legal/terms`);
    if (!response.ok) {
      throw new Error('Failed to fetch Terms of Service');
    }
    return response.text();
  },
  getPrivacy: async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/legal/privacy`);
    if (!response.ok) {
      throw new Error('Failed to fetch Privacy Policy');
    }
    return response.text();
  },
};
