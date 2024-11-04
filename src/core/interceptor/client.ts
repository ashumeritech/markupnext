import axios, { AxiosResponse } from 'axios';
import config from '../../helpers/config.helper';
import RoutesConstants from '../../constants/routes.constant';
// import { getToken } from '../../helpers/localStorages.helper';
import { ErrorMessage } from '../../constants/error.constant';

const appConfig = config();
export const baseURL = appConfig.REACT_APP_API_URL;
export const baseAPI = axios.create({ baseURL });

const requestHandler = (request: any) => {
    // const token = getToken();
    // request.headers['authorization'] = 'Bearer ' + token;
    return request;
};

const errorHandler = async (error: any) => {
    let message: string = ErrorMessage.ErrorOccured;
    if (error.response) {
        if (error.response.status === 401) {
            const err = error.response.data?.message ? error.response.data?.message : error.response.data;
            switch (err) {
                case ErrorMessage.InvalidUsernameOrPassword:
                    message = error.response.data.message;
                    break;
                default:
                    localStorage.clear();
                    window.location.href = RoutesConstants.Login
                    return;
            }
        } else if (error.response.status === 403) {
            message = ErrorMessage.UnauthorizedAccess;
        }
        else if (error.response.data && error.response.data?.message) {
            message = error.response.data.message
        }
    }
    return Promise.reject(message);
};
const successHandler = (response: AxiosResponse): AxiosResponse => {
    return response;
};

baseAPI.interceptors.request.use(request => {
    return requestHandler(request)
});

baseAPI.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);