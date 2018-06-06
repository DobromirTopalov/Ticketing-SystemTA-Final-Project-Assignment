import { UsersDBModel } from "./usersDBModel";
import { Company } from "../company/company";
import { Role } from "../tickets/role";

export class User {
  id ?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  CompanyId?: number;
  RoleId?: number;
  Company?: Company;
  Role?: Role;
  UserId?: number;
  info?: {
    TeamId: number;
    id: number;
    Company: Company;
    CompanyId: number;
    email ?: string;
    password ?: string;
    firstName ?: string;
    lastName ?: string;
    avatar ?: string;
    createdAt ?: string;
    updatedAt ?: string;
    deletedAt ?: string | null;
    RoleId ?: number;
    Role ?: Role;
    UserId ?: number;
    info ?: any;
  };
  TeamId?: number;
}
