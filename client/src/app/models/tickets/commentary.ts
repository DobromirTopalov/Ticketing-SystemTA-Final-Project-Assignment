import { Ticket } from "./ticket";
import { User } from "../users/user";

export interface Commentary {
  id: number;
  Ticket: Ticket;
  User: User;
  TicketId: number;
  UserId: number;
  date: string;
  content: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;

}
