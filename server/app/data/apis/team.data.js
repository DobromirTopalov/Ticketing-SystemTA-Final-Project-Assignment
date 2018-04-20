const SharedData = require('./shared.data');

const {
  User,
  Team,
  Company,
} = require('../../../database/models');

class TeamData extends SharedData {
  constructor(Model) {
    super(Team, [User, Company, { model: User, as: 'teamLeaderId' }]);
  }

  createTeam(TeamObject, TeamLeaderId, CompanyId) {
    try {
      const result = this.Model
        .create({
          name: TeamObject.getName(),
          description: TeamObject.getDescription(),
          TeamImgUrl: TeamObject.getImg(),
          TeamLeaderId: TeamLeaderId,
          CompanyId: CompanyId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateTeam(TeamId, TeamObject, TeamLeaderId, CompanyId) {
    try {
      const result = this.Model.update({
        name: TeamObject.getName(),
        description: TeamObject.getDescription(),
        TeamImgUrl: TeamObject.getImg(),
        TeamLeaderId: TeamLeaderId,
        CompanyId: CompanyId,
      }, {
        where: {
          id: TeamId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamData;
