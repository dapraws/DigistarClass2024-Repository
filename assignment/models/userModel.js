const users = [];

class User {
  constructor(id, name, email, password, linkImgProfile) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.linkImgProfile = linkImgProfile || null;
  }
}

module.exports = { users, User };
