import { BASE_URL } from "@/config";

export const legalService = {
  getTerms: async (): Promise<string> => {
    try {
      const response = await fetch(`${BASE_URL}/legal/terms`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Terms of Service: ${response.statusText}`);
      }
      return response.text();
    } catch (error) {
      console.error("Error fetching Terms of Service:", error);
      return "Failed to load Terms of Service. Please try again later.";
    }
  },
  getPrivacy: async (): Promise<string> => {
    try {
      const response = await fetch(`${BASE_URL}/legal/privacy`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Privacy Policy: ${response.statusText}`);
      }
      return response.text();
    } catch (error) {
      console.error("Error fetching Privacy Policy:", error);
      return "Failed to load Privacy Policy. Please try again later.";
    }
  },
};
