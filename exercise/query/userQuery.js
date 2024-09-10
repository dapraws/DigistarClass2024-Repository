const User = require("../model/User");

class UserQuery{
    static async createOneUser(user){
        await User.create(user);
    }
}

module.exports = UserQuery