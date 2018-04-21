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
}

module.exports = TeamData;
