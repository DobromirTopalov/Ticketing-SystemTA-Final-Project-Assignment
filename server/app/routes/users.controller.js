class UsersController {
  constructor(data) {
    this.data = data;
  }

  getUsers() {
    return async (req, res, next) => {
      const users = await this.data.users.getAll();

      return res.status(401).send({
        users,
      });
    };
  }

  getByEmail() {
    return async (req, res, next) => {
      const users = await this.data.users.getAll();
      const user = users.find((x) => x.email === req.params.email);

      return res.status(401).send({
        user,
      });
      // return user;
    };
  }
}

module.exports = UsersController;
