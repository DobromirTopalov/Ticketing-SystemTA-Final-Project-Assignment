export interface Team {
  id: number;
  name: string;
  description: string;
  teamImgUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  teamLeaderId: number;
  companyId: number;
  Users: object[];
  Company: object;
  teamLeader: object;
}
