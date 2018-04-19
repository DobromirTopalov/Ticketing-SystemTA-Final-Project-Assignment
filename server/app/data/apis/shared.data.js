const {
  User,
  Ticket,
  Company,
  Role,
  Status,
  Label,
  Team,
} = require('../../../database/models');

class SharedData {
  constructor(Model) {
    this.Model = Model;
  }

  getAll() {
    const result = this.Model.findAll({
      // raw: true,
    });

    return result;
  }

  getById(SomeId) {
    const result = this.Model.findOne({
      where: {
        id: SomeId,
      },
      raw: true,
    });

    return result;
  }

  getInfoById(someId) {
    const result = this.Model.findOne({
      where: {
        id: someId,
      },
      include: [
        {
          model: User,
          include: [
            {
              model: Company,
              raw: true,
            },
            {
              model: Role,
              raw: true,
           },
          ],
          raw: true,
        },
        {
          model: Ticket,
          include: [
            {
              model: Team,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: User,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: Status,
              raw: true,
            },
            {
              model: Label,
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
          ],
          raw: true,
        },
      ],
      raw: true,
    });

    return result;
  }

  getAllInfo() {
    const result = this.Model.findAll({
      include: [
        {
          model: User,
          include: [
            {
              model: Company,
              raw: true,
            },
            {
              model: Role,
              raw: true,
           },
          ],
          raw: true,
        },
        {
          model: Ticket,
          include: [
            {
              model: Team,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: User,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: Status,
              raw: true,
            },
            {
              model: Label,
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
            {
              model: User,
              include: [
                {
                  model: Company,
                  raw: true,
                },
                {
                  model: Role,
                  raw: true,
                },
              ],
              raw: true,
            },
          ],
          raw: true,
        },
      ],
      raw: true,
    });

    return result;
  }
}

module.exports = SharedData;
