import { LabelType } from './labels.enum';
import { StatusType } from './statuses.enum';

export interface Ticket {
  description: string;
  deadline: number;
  team: string;
  status: StatusType;
  label: LabelType;
  requester: string;
  assignee: string;
  escalationContact: string;

  members: string[];
}
