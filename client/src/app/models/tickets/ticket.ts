import { User } from '../users/user';
import { Status } from './status';
import { Label } from './label';

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
  Users ?: User[];
  requesterId ?: User;
  assigneeId ?: User;
  Status ?: Status;
  Label ?: Label;

}
