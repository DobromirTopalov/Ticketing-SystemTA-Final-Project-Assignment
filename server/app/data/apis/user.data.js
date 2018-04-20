const SharedData = require('./shared.data');

const {
  User,
  Company,
  Role,
} = require('../../../database/models');

class UserData extends SharedData {
  constructor(Model) {
    super(User, [Company, Role]);
  }

  createUser(UserObject, CompanyId, RoleId) {
    try {
      const result = this.Model
        .create({
          // firstName: UserObject.getFirstName(),
          // lastName: UserObject.getLastName(),
          // email: UserObject.getEmail(),
          // password: UserObject.getPassword(),
          // avatarImgUrl: UserObject.getImg(),
          // CompanyId: CompanyId,
          // RoleId: RoleId,

          firstName: 'Gosho',
          lastName: 'Posho',
          email: UserObject.email,
          password: UserObject.password,
          avatarImgUrl: 'neshto.jpg',
          CompanyId: CompanyId,
          RoleId: RoleId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateUser(UserId, UserObject, CompanyId, RoleId) {
    try {
      const result = this.Model.update({
        firstName: UserObject.getFirstName(),
        lastName: UserObject.getLastName(),
        email: UserObject.getEmail(),
        password: UserObject.getPassword(),
        avatarImgUrl: UserObject.getAvatar(),
        CompanyId: CompanyId,
        RoleId: RoleId,
      }, {
        where: {
          id: UserId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserData;
