export type Vcat2ApiToolConfig<RequestArgs> = {
  method: 'GET' | 'POST' | 'DELETE',
  createRequest: (args: RequestArgs) => {
    uri: string,
    headers?: { [key: string]: string },
    requestParam?: { [key: string]: string },
    body?: string,
  },
};

export type ExpressResponse<ResponseData> = ExpressSuccessResponse<ResponseData> | ExpressFailureResponse;
export type ExpressSuccessResponse<ResponseData> = {
  success: true,
  data: ResponseData,
};
export type ExpressFailureResponse = {
  success: false,
  message: string[],
};

const defaultHttpHeader = {
  'content-type': 'application/json',
};

export class Vcat2ApiTool<RequestArgs, ResponseData> {
  constructor(private config: Vcat2ApiToolConfig<RequestArgs>) { };
  async request(args: RequestArgs) {
    const { uri, body, headers, requestParam } = this.config.createRequest(args);
    const url = createRequestUrl(uri, requestParam || {});
    const authorizationHeader = await getAuthorizationHeader();
    const response = await fetch(url, {
      method: this.config.method,
      headers: { ...defaultHttpHeader, ...headers, ...authorizationHeader },
      body,
    });
    return response.json() as Promise<ExpressResponse<ResponseData>>;
  };
};

const createRequestUrl = (uri: string, requestParam: { [key: string]: string },) => {
  const requestParamArray = [] as string[];
  for (let key in requestParam) requestParamArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(requestParam[key]));
  const requestParamStr = requestParamArray.join('&');
  return `${process.env['REACT_APP_EXPRESS_URL']}${uri}` + (requestParamStr ? `?${requestParamStr}` : '');
};

/**
 * Private APIの実行に必要なHTTP認証ヘッダーを生成する。
 * @returns HTTPヘッダーのうち、認証で必要な部分。
 */
const getAuthorizationHeader = () => {
  return { 'AUTH-TOKEN': process.env['REACT_APP_EXPRESS_AUTH_TOKEN'] || '', };
};
