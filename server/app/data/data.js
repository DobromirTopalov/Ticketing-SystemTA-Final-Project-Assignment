const {
    User,
    Ticket,
    Commentary,
    Company,
    Label,
    Log,
    Notification,
    Role,
    Status,
    Team,
    TeamUser,
    TicketUser,
} = require('../../database/models');

const UserData = require('./apis/user.data');
const TicketData = require('./apis/ticket.data');
const CommentaryData = require('./apis/commentary.data');
const CompanyData = require('./apis/company.data');
const LabelData = require('./apis/label.data');
const LogData = require('./apis/log.data');
const NotificationData = require('./apis/notification.data');
const RoleData = require('./apis/role.data');
const StatusData = require('./apis/status.data');
const TeamData = require('./apis/team.data');
const TeamUserData = require('./apis/teamuser.data');
const TicketUserData = require('./apis/ticketuser.data');

module.exports = {
    tickets: new TicketData(Ticket),
    users: new UserData(User),
    commentaries: new CommentaryData(Commentary),
    companies: new CompanyData(Company),
    labels: new LabelData(Label),
    logs: new LogData(Log),
    notifications: new NotificationData(Notification),
    roles: new RoleData(Role),
    statuses: new StatusData(Status),
    teams: new TeamData(Team),
    teamuser: new TeamUserData(TeamUser),
    ticketuser: new TicketUserData(TicketUser),
};
