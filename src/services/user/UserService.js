class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
    this.listUsers = this.listUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this._extractFields = this._extractFields.bind(this);
  }

  createUser(firstName, lastName) {
    const user = new this.UserModel({ firstName, lastName });
    return user.save();
  }

  async listUsers(offset = 0, limit = 0, fields = []) {
    const users = await this.UserModel.find({ deleted: false }, null, {
      skip: offset,
      limit
    });

    if (fields.length < 1) return users;

    return Array.from(users).map(user => {
      return this._extractFields(user, fields);
    });
  }

  async getUser(userId, fields = []) {
    const user = await this.UserModel.findOne({ _id: userId, deleted: false });
    return this._extractFields(user, fields);
  }

  async updateUser(userId, firstName, lastName) {
    const user = await this.UserModel.findById(userId);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    return user.save();
  }

  async deleteUser(userId) {
    const user = await this.UserModel.findById(userId);
    user.deleted = true;
    return user.save();
  }

  _extractFields(user, fields) {
    if (fields.length < 1) return user;
    const result = fields.reduce((acc, field) => {
      acc[field] = user[field];
      return acc;
    }, {});

    return result;
  }
}

module.exports = UserService;
