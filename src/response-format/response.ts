export interface ApiResponse<T> {
  code?: number
  status: true | false
  message: string
  errorDetails?: string // Optional error details
  data?: T // Optional data field
}

export function successResponse<T>(
  code: number,
  message: string,
  data?: T,
): ApiResponse<T> {
  return {
    code,
    status: true,
    message,
    data,
  }
}

export function errorResponse<T>(
  code: number,
  message: string,
  data?: T,
  errorDetails?: string,
): ApiResponse<T> {
  return {
    code,
    status: false,
    message,
    errorDetails,
    data,
  }
}
