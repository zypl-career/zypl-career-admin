export type AxiosErrorResponse = {
  data: AxiosErrorData
  status: number
  statusText: string
  headers: AxiosErrorHeaders
  config: AxiosErrorConfig
  request: object
}

export type AxiosErrorData = {
  error: string
}

export type AxiosErrorHeaders = {
  'cache-control': string
  'content-type': string
}

export type AxiosErrorConfig = {
  transitional: Transitional
  adapter: string[]
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env?: object
  headers: AxiosErrorConfigHeaders
  baseURL: string
  params: Record<string, unknown>
  method: string
  url: string
}

export type Transitional = {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}


export type AxiosErrorConfigHeaders = {
  Accept: string
  'Content-Type': string
  Authorization: string
}
