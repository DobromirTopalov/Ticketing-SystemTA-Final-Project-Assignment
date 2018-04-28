import { LabelType } from './labels.enum';
import { StatusType } from './statuses.enum';
import { User } from '../users/user';
import { Team } from '../teams/teams';

export interface Ticket {
  id: number,
  description: string;
  deadline: string;
  StatusId: number;
  LabelId: number;
  TeamId: number;
  RequesterId: number;
  AssigneeId: number;
  EscalationContactId: number;

}
