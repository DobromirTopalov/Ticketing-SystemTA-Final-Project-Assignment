import { User } from "../users/user";

export interface Team {
  id: number;
  name: string;
  description: string;
  teamImgUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  teamLeaderId: number;
  CompanyId: number;
  Users: User[];
  Company: object;
  teamLeader: object;
}
