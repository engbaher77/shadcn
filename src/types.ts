interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  platformRole: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userBusinessRoles: Record<string, unknown>[]; // Adjust this type as necessary
  userClaims: Record<string, unknown>[]; // Adjust this type as necessary
}
export interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}
export type { User };
