const SharedData = require('./shared.data');

const {
  User,
  Ticket,
  Company,
  Role,
  Status,
  Label,
  Team,
} = require('../../../database/models');

class TicketData extends SharedData {
  constructor(Model) {
    super(Ticket, [Company, Role { model: PhoneNumber, as: 'phoneNumbers' }]);
  }

  createTicket(TicketObject, TeamId, StatusId, LabelId, RequesterId, AssigneeId, EscalationContactId) {
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

  updateTicket(TicketId, TicketObject, TeamId, StatusId, LabelId, RequesterId, AssigneeId, EscalationContactId) {
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

  async getTicket(id, user) {
    const tickets = await super.getById(id);
    const requesterId = tickets.dataValues.RequesterId;
    const assigneeId = tickets.dataValues.AssigneeId;
    const escalationContactId = tickets.dataValues.EscalationContactId;

    const teamData = await tickets.getTeam({
      raw: true,
    });
    const statusData = await tickets.getStatus({
      raw: true,
    });

    const labelData = await tickets.getLabel({
      raw: true,
    });
    const userData = await tickets.getUsers({
      raw: true,
    });
    console.log(userData);

    const requesterData = await user.getByParamId(requesterId);
    const assigneeData = await user.getByParamId(assigneeId);
    const escalationContactData = await user.getByParamId(escalationContactId);

    const ticket = {
      id: tickets.dataValues.id,
      description: tickets.dataValues.description,
      deadline: tickets.dataValues.deadline,
      team: {
        name: teamData.name,
        description: teamData.description,
        teamImgUrl: teamData.teamImgUrl,
        TeamLeaderId: teamData.TeamLeaderId,
        CompanyId: teamData.CompanyId,
      },
      status: statusData.name,
      label: labelData.name,
      requester: {
        data: requesterData,
        // email: requesterData.email,
        // firstName: requesterData.firstName,
        // lastName: requesterData.lastName,
        // avatarImgUrl: requesterData.avatarImgUrl,
        // CompanyId: requesterData,
        // RoleId: requesterData,
      },
      assignee: {
        email: assigneeData.email,
        firstName: assigneeData.firstName,
        lastName: assigneeData.lastName,
        avatarImgUrl: assigneeData.avatarImgUrl,
        CompanyId: assigneeData,
        RoleId: assigneeData,
      },
      escalationContact: {
        email: escalationContactData.email,
        firstName: escalationContactData.firstName,
        lastName: escalationContactData.lastName,
        avatarImgUrl: escalationContactData.avatarImgUrl,
        CompanyId: escalationContactData,
        RoleId: escalationContactData,
      },
    };
    return ticket;
  }
}

module.exports = TicketData;
