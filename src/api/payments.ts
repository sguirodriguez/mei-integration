
import { Customer, DefaultResponse, PaymentConfig, PaymentData, PaymentResponse } from '../types/api.types';
import { request } from '../utils/request';

export const createPayment = async (customerId: string, data: PaymentData): Promise<DefaultResponse<PaymentResponse>> => {
    const response = await request({
        method: 'POST',
        path: `/payments/${customerId}`,
        body: data
    });

    return response.data;
};

export const getPaymentStatus = async (txid: string) => {
    const timestamp = Date.now();
    const response = await request({
        method: 'GET',
        path: `/payments/${txid}?timestamp=${timestamp}`,
        headers: {
            cache: 'no-store',
        },
    });

    return response.data;
};

export const getPaymentConfigs = async (): Promise<DefaultResponse<PaymentConfig>> => {
    const response = await request({
        method: 'GET',
        path: '/payments/configs',
    });

    return response.data;
};

export const completePayment = async (customerId: string, data: { customerData: { cpf: string, govPassword: string } }): Promise<DefaultResponse<any>> => {
    const response = await request({
        method: 'PATCH',
        path: `/customers/${customerId}`,
        body: data
    });

    return response.data;
}
