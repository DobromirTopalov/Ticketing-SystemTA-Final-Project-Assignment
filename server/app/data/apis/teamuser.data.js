const SharedData = require('./shared.data');

const {
  TeamUser,
  Team,
  User,
} = require('../../../database/models');

class TeamUserData extends SharedData {
  constructor(Model) {
    super(TeamUser, [Team, User]);
  }
}

module.exports = TeamUserData;
