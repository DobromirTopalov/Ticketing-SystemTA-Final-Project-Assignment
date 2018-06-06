const SharedController = require('../shared.controller');

class TeamController extends SharedController {
  constructor(data) {
    super(data, 'teams');
    this.data = data;
  }

  addUserToTeam() {
    return async (req, res, next) => {
      const obj = await {
        UserId: req.body.UserId,
        TeamId: req.body.TeamId,
      };

      const team = await this.data.teams.getById(obj.TeamId);
      const user = await this.data.users.getById(obj.UserId);

      const result = await this.data.teamuser.findOrCreate(obj);

      // return created object to api
      return await res.status(200).send({
        result,
      });
    };
  }

  userLeaveTeam() {
    return async (req, res, next) => {
      const obj = await {
        UserId: req.body.UserId,
        TeamId: req.body.TeamId,
      };

      const team = await this.data.teams.getById(obj.TeamId);
      const user = await this.data.users.getById(obj.UserId);
      const result = await this.data.teamuser.delete(obj);

      // return created object to api
      return await res.status(200).send({
        obj,
      });
    };
  }

  createTeam() {
    return async (req, res, next) => {
      const obj = await req.body;

      const team = await this.data.teams.findOrCreate({
        name: obj.name,
        description: obj.description,
        teamImgUrl: obj.teamImgUrl,
        CompanyId: obj.CompanyId,
        TeamLeaderId: obj.TeamLeaderId,
      });

      // return created object to api
      return await res.status(200).send({
        team,
      });
    };
  }

  removeTeam() {
    return async (req, res, next) => {
      const obj = await req.body;

      const team = await this.data.teams.delete(obj);

      // return created object to api
      return await res.status(200).send({
        team,
      });
    };
  }

  setNewLeader() {
    return async (req, res, next) => {
      const obj = await {
        UserId: req.body.UserId,
        TeamId: req.body.TeamId,
      };


      const team = await this.data.teams.getById(obj.TeamId);
      // const user = await this.data.users.getById(obj.UserId);
      const result = await team.setTeamLeaderId(obj.UserId);
      // console.log(result);

      // return created object to api
      return await res.status(200).send({
        obj,
      });
    };
  }

  updateTeam() {
    return async (req, res, next) => {
      const result = await this.data.teams.update(req.body, { id: req.body.id });

      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }

}
module.exports = TeamController;
