// eslint-disable-next-line
import { Configuration, TodosApi as TodosAPI } from "@/api";
import TokenUtil from "../utils/TokenUtil";
import { URLS } from "@/constants";

export class TodosApi extends TodosAPI {
  protected static _instance: TodosApi;

  public static get instance(): TodosApi {
    return this.createInstance();
  }
  public static createInstance() {
    if (this._instance == null) {
      const token = TokenUtil.getToken();
      if (this._instance == null && token) {
        const config = new Configuration({
          accessToken: token,
          basePath: `${URLS.API_BASE_URL}${URLS.API_VERSION}`,
        });
        this._instance = new this(config);
      } else {
        // NOTE: 何かしらconfigration optionを入れないとconfigが生成されない
        const config = new Configuration({
          username: "enduser",
          basePath: `${URLS.API_BASE_URL}${URLS.API_VERSION}`,
        });
        this._instance = new this(config);
      }
    }
    if (!this._instance.configuration?.apiKey) {
      const token = TokenUtil.getToken();
      if (token) {
        const config = new Configuration({
          accessToken: token,
          basePath: `${URLS.API_BASE_URL}${URLS.API_VERSION}`,
        });
        this._instance = new this(config);
      }
    }
    return this._instance;
  }
}
