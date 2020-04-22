export default class Config {
  static Agreement = "http://";
  static BaseUrl = "127.0.0.1";
  static ServerUrl = "";
  static ServerPort = ":1024";
  static Path = "/";
  static CryptoKey = "tokenkey"; //加密信息关键字
  static RequestPath = Config.Agreement + Config.BaseUrl + Config.ServerPort + Config.Path;
  static RequestTimeOut = 10 * 1000;
  static ServerApi = {
    //接口名
    token: "checkToken",
    user: {
      userLogin: "user/userLogin",
      updateUser: "user/updateUser",
    },
    shop: {
      shopList: "shop/shopList",
    },
  };
  static UploadName = {
    headPic: "upload/headPic"
  };
  static UploadKey = {
    headKey: "headPic"
  };
  static StorageName = {
    token: "token"
  };
  static EventName = {
    SelectKind: 'selectKind'
  }
  static DefaultPageConfig = {
    shopType: "",
    picType: "",
    keyWord: "",
    page: 1,
    isactive: true,
    pageSize: '',
    totalPage: 1,
    sort: '1',
  }
}