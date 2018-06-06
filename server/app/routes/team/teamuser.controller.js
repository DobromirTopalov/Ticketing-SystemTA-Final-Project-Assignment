const SharedController = require('../shared.controller');

class TeamUserController extends SharedController {
  constructor(data) {
    super(data, 'teamuser');
    this.data = data;
  }

  addTeamUser() {
    return async (req, res, next) => {
      const obj = {
        TeamId: +req.body.TeamId,
        UserId: +req.body.UserId,
      };

      const restoreDeleted = await this.data.teamuser.restore(obj);
      let result = restoreDeleted;
      if (!restoreDeleted) {
        result = await this.data.teamuser.findOrCreate(obj);
      }


      // return created object to api
      return await res.status(200).send({
        result,
      });
    };
  }

  removeTeamUser() {
    return async (req, res, next) => {
      const obj = await {
        TeamId: req.body.TeamId,
        UserId: req.body.UserId,
      };

      const result = await this.data.teamuser.hardDelete(obj);

      // return created object to api
      return await res.status(200).send({
        result,
      });
    };
  }
}
module.exports = TeamUserController;
