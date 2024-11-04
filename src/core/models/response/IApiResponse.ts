export default interface IApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
};

export interface IApiErrorResponse{
    code: number;
    message: string;
};