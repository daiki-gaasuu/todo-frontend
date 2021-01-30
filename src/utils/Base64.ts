/**
 * Base64 encode/decode class
 */
export default class Base64 {
  /**
   * textをBase64でエンコード
   * @param  {string} text エンコード前テキスト
   * @return {string}      エンコード後テキスト
   */
  public static encode(text: string): string {
    return btoa(encodeURIComponent(text));
  }

  /**
   * base64をデコード
   * @param  {string} base64 エンコード後テキスト
   * @return {string}        エンコード前テキスト
   */
  public static decode(base64: string): string {
    return decodeURIComponent(atob(base64));
  }
}
