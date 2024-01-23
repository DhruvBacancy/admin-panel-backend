export interface ApiResponse<T> {
    status: true | false;
    message: string;
    errorDetails?: string;
    data?: T;
}
export declare function successResponse<T>(message: string, data?: T): ApiResponse<T>;
export declare function errorResponse<T>(message: string, data?: T, errorDetails?: string): ApiResponse<T>;
