const SharedData = require('./shared.data');

class TeamUserData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createTeamUser(TeamUserObject, TeamId, UserId) {
    try {
      const result = this.Model
        .create({
          TeamId: TeamId,
          UserId: UserId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateTeamUser(TeamUserObject, TeamId, UserId) {
    try {
      const result = this.Model.update({
        TeamId: TeamId,
        UserId: UserId,
      }, {
        where: {
          TeamId: TeamId,
          UserId: UserId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamUserData;
