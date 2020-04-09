const user = require("../src/controller/user/user");
const upload = require("../src/controller/upload/upload");
const Util = require("../utils/utils");
const Config = require("../config/config");
module.exports = class Route {
  constructor(app) {
    app.get(Config.ServerApi.checkToken, Util.checkToken, (req, res) => {
      res.send({
        result: 1,
        msg: "验证成功",
        data: res._data
      });
    });
    app.use("/user", user);
    app.use("/upload", upload);
  }
};