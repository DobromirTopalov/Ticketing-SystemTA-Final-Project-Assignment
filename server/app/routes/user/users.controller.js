class UsersController {
  constructor(data) {
    this.data = data;
  }

  getUsers() {
    return async (req, res, next) => {
      const users = await this.data.users.getAll();

      return res.status(200).send({
        users,
      });
    };
  }

  getByEmail() {
    return async (req, res, next) => {
      const users = await this.data.users.getAll();
      const user = users.find((x) => x.email === req.params.email);

      try {
        if (!user) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        user,
      });
    };
  }
}

module.exports = UsersController;
