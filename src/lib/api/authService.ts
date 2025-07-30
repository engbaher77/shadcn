import { User } from '@/types';
import { BASE_URL } from '@/config';

const USE_MOCKED_DATA = process.env.NODE_ENV === 'production';//development';

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const mockedLoginResponse: LoginResponse = {
  user: {
    id: 'cmdpteunm000wyx0xw0qebq2b',
    email: 'eng.baher77@gmail.com',
    firstName: 'Baher',
    lastName: 'Elnaggar',
    platformRole: 'PLATFORM_USER',
    isActive: true,
    createdAt: '2025-07-30T10:20:36.659Z',
    updatedAt: '2025-07-30T11:55:19.275Z',
    userBusinessRoles: [],
    userClaims: [],
  },
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWRwdGV1bm0wMDB3eXgweHcwcWVicTJiIiwiZW1haWwiOiJlbmcuYmFoZXI3N0BnbWFpbC5jb20iLCJwbGF0Zm9ybVJvbGUiOiJQTEFURk9STV9VU0VSIiwiYnVzaW5lc3NJZHMiOltdLCJpYXQiOjE3NTM4ODU2NDgsImV4cCI6MTc1Mzg4NjU0OH0.3rNbmqpM0YsX6L-EAF_TVyIbZyodDyteiYdl7DYFM_w',
  refreshToken:
    'aacc0c7f1038761049a29d6ac0b87cb868585ca5864c87bc5844db43a91442ad3c51595cf8e2e3fad5f8ec66ee7da9cc66b897371a2a8be438b7fc8d9f86dd0d',
  expiresIn: 900,
};

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    if (USE_MOCKED_DATA) {
      console.log('Using mocked login data');
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockedLoginResponse), 1000)
      );
    } else {
      // Real API call would go here
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    }
  },
};
