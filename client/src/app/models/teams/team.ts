import { User } from "../users/user";
import { Company } from "../company/company";

export interface Team {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
  CompanyId?: number;
  Users?: User[];
  Company?: Company;
  teamLeader?: User;
  teamLeaderId?: User;
  info?: {
    teamLeaderId: User;
    Users: User[];
    id: number;
    CompanyId: number;
    name: string;
    description: string;
    TeamLeaderId: number;
  };
}
