const SharedData = require('./shared.data');

const {
  User,
  Ticket,
  Status,
  Label,
  Team,
} = require('../../../database/models');

class TicketData extends SharedData {
  constructor(Model) {
    super(Ticket, [User, Status, Label, Team,
                    { model: User, as: 'requesterId' },
                    { model: User, as: 'assigneeId' },
                    { model: User, as: 'escalationContactId' },
                  ]);
  }

  createTicket(TicketObject, TeamId, StatusId, LabelId,
               RequesterId, AssigneeId, EscalationContactId) {
    try {
      const result = this.Model
        .create({
          deadline: TicketObject.getName(),
          description: TicketObject.getDescription(),
          TeamId: TeamId,
          StatusId: StatusId,
          LabelId: LabelId,
          RequesterId: RequesterId,
          AssigneeId: AssigneeId,
          EscalationContactId: EscalationContactId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateTicket(TicketId, TicketObject, TeamId, StatusId, LabelId,
               RequesterId, AssigneeId, EscalationContactId) {
    try {
      const result = this.Model.update({
        deadline: TicketObject.getName(),
        description: TicketObject.getDescription(),
        TeamId: TeamId,
        StatusId: StatusId,
        LabelId: LabelId,
        RequesterId: RequesterId,
        AssigneeId: AssigneeId,
        EscalationContactId: EscalationContactId,
      }, {
        where: {
          id: TicketId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketData;
