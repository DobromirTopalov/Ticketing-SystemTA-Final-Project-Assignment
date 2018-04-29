import { UsersModel } from "./usersModel";

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  CompanyId: number;
  RoleId: number;
  Company: object;
  Role: object;
  UserId: number;
  info: User[];
  TeamId: number;
}
