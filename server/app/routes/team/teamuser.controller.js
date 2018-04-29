const SharedController = require('../shared.controller');

class TeamUserController extends SharedController {
  constructor(data) {
    super(data, 'teamuser');
    this.data = data;
  }
}
module.exports = TeamUserController;
