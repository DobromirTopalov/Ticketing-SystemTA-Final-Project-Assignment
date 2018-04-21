const SharedController = require('../shared.controller');

class TeamController extends SharedController {
  constructor(data) {
    super(data, 'teams');
    this.data = data;
  }
}
module.exports = TeamController;
