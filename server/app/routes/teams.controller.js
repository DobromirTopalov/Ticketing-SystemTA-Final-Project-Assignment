class TeamController {
  constructor(data) {
    this.data = data;
  }

  getTeams() {
    return async (req, res, next) => {
      const teams = await this.data.teams.getAll();
      console.log('asd');
      return res.status(401).send({
        teams,
      });
    };
  }

  getByName() {
    return async (req, res, next) => {
      const teams = await this.data.teams.getAll();
      const team = teams.find((x) => x.name === req.params.name);

      return res.status(401).send({
        team,
      });
    };
  }
}

module.exports = TeamController;
