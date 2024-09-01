class AdminController {
  static async getAllAdmin(req, res) {
    res.status(200).send("All Admin");
  }
  static async addAdmin(req, res) {
    res.status(200).send("Success");
  }
}

module.exports = AdminController;
