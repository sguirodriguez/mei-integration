import axios, { ResponseType } from 'axios';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

const defaultMessage = 'Erro ao realizar a operação!';

interface IRequest {
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
    path: string;
    body?: any;
    headers?: any;
    baseURL?: string;
    params?: any;
    responseType?: ResponseType;
}

const sendResponse = ({
    status,
    message,
    data,
}: {
    status?: number;
    message?: any;
    data?: any;
}) => {
    if (status != 200 || !status) {
        return { error: !message ? defaultMessage : message, status };
    }
    return { error: null, data, status };
};

const request = async ({
    method,
    path,
    body,
    headers,
    baseURL,
    params,
    responseType,
}: IRequest) => {
    try {
        const defineBaseURL = config.production.BASE_URL;
        const apiURL = baseURL || defineBaseURL;

        const { status, statusText, data } = await axios.request({
            baseURL: apiURL,
            headers,
            method,
            url: path,
            data: body,
            params,
            responseType,
        });

        return sendResponse({
            status,
            message: data?.message || statusText,
            data: data.data ? data.data : data,
        });
    } catch (error: any) {
        return sendResponse({
            status: error?.response?.status,
            message:
                error.data?.message ||
                error.response?.data?.message ||
                error.message ||
                defaultMessage,
        });
    }
};

export { request };
