class TeamController {
  constructor(data) {
    this.data = data;
  }

  getTeams() {
    return async (req, res, next) => {
      const teams = await this.data.teams.getAll();

      return res.status(200).send({
        teams,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const teams = await this.data.teams.getAll();
      const team = teams.find((x) => x.id === +req.params.id);

      try {
        if (!team) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        team,
      });
    };
  }

  getByName() {
    return async (req, res, next) => {
      const teams = await this.data.teams.getAll();
      const team = teams.find((x) => x.name === req.params.name);

      try {
        if (!team) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        team,
      });
    };
  }
}

module.exports = TeamController;
