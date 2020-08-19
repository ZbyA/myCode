import Vue from "vue";
import config from "../../config/config";
const { ServerApi, StorageName } = config;
export default class UserInfoBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
  }
  checkToken() {
    let token = this.$storage.getStorage(StorageName.Token);
    if (!token || !token.length) return;
    this.$axios
      .get(ServerApi.token, {
        params: {
          token
        }
      })
      .then(res => {
        switch (res.result) {
          case -999:
            this.vueComponent.isLogin = false;
            this.$storage.clearStorage(StorageName.Token);
            break;
          case 1:
            this.vueComponent.userInfo = res.data;
            this.vueComponent.isLogin = true;
            break;
          default:
            this.vueComponent.isLogin = false;
            this.$storage.clearStorage(StorageName.Token);
            break;
        }
      })
      .catch(err => {});
  }
}
