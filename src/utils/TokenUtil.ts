import Base64 from "./Base64";

export default class TokenUtil {
  public static setToken(token: string, isStore?: boolean): void {
    if (isStore) {
      localStorage.setItem("token", Base64.encode(token));
    } else {
      sessionStorage.setItem("token", Base64.encode(token));
    }
  }

  public static getToken(): string | null {
    let rawToken = null;
    rawToken = sessionStorage.getItem("token");
    if (rawToken == null) {
      rawToken = localStorage.getItem("token");
    }

    if (rawToken == null) {
      return null;
    }

    const token: string = Base64.decode(rawToken);
    return token;
  }

  public static removeToken() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }
}
