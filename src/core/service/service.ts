import * as axios from '../interceptor/client';

let config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const uploadConfig = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};

export const get = (url: string) => {
    return axios.baseAPI.get(url, config)
};

export const post = (url: string, data: any) => {
    return axios.baseAPI.post(url, data, config)
};

export const put = (url: string, data: any) => {
    return axios.baseAPI.put(url, data, config)
};

export const deleteapi = (url: string, data?: any) => {
    return data? axios.baseAPI.delete(url, {...config, data: {...data}}) : axios.baseAPI.delete(url, config);
};

export const postUpload = (url: string, data: any) => {
	return axios.baseAPI.post(url, data, uploadConfig)
};

export const putUpload = (url: string, data: any) => {
	return axios.baseAPI.put(url, data, uploadConfig)
};