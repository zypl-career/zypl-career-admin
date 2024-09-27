export type TResponse<T> = {
  total: number
  page: number
  limit: number
  data: T
}