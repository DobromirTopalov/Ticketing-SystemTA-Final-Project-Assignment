const SharedController = require('../shared.controller');

class TeamController extends SharedController {
  constructor(data) {
    super(data, 'teams');
    this.data = data;
  }

  addUserToTeam() {
    console.log('inside func');
    return async (req, res, next) => {
      console.log('inside funcncncncn');
      // replace with req.body
      console.log(req.body);
      const obj = await {
        UserId: req.body.UserId,
        TeamId: req.body.TeamId,
      };
      console.log(obj);

      // object validate info
      // let validObj;
      // try {
      //   validObj = {
      //     userId: this.setParam(obj.userId),
      //     teamId: this.setParam(obj.teamId),
      //   };
      // } catch (error) {
      //   return res.status(401).send(JSON.parse(`{"error": "${error}"}`));
      // }

      // if validation passed - create/ update DB
      console.log(this.data.teamuser);
      // await this.data.teamuser.findOrCreate(obj);
      // Task.findById(1).then(task => {
      //   Project.findById(1).then(project => {
      //     task.setProjects([project]).then(result => {
      //       console.log(JSON.stringify(project))
      //     })
      //   })
      // })

      const team = await this.data.teams.getById(obj.TeamId);
      const user = await this.data.users.getById(obj.UserId);
      const result = await team.addUsers([user]);
      console.log(result);

      // return created object to api
      return await res.status(200).send({
        result,
      });
    };
  }

  userLeaveTeam() {
    return async (req, res, next) => {
      console.log('inside leave func');
      // replace with req.body
      console.log(req.body);
      const obj = await {
        UserId: req.body.UserId,
        TeamId: req.body.TeamId,
      };
      console.log(obj);

      const team = await this.data.teams.getById(obj.TeamId);
      const user = await this.data.users.getById(obj.UserId);
      const result = await team.removeUsers([user]);
      console.log(result);

      // return created object to api
      return await res.status(200).send({
        obj,
      });
    };
  }
}
module.exports = TeamController;
