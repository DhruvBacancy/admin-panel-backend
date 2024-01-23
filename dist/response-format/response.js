"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
function successResponse(message, data) {
    return {
        status: true,
        message,
        data,
    };
}
exports.successResponse = successResponse;
function errorResponse(message, data, errorDetails) {
    return {
        status: false,
        message,
        errorDetails,
        data,
    };
}
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map