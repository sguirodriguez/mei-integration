import { Customer, CustomerData, DefaultResponse } from '../types/api.types';
import { request } from '../utils/request';
interface CreateCustomerRequest {
    customerData: CustomerData & {
        aff?: string;
        utmSource?: string;
        utmMedium?: string;
        utmCampaign?: string;
        utmContent?: string;
        utmTerm?: string;
        sid?: string;
    };
}

export const createCustomer = async (data: CreateCustomerRequest): Promise<DefaultResponse<Customer>> => {
    const response = await request({
        method: 'POST',
        path: '/customers',
        body: data
    });

    return response.data;
};

export const getCustomer = async (customerId: string): Promise<DefaultResponse<Customer>> => {
    const response = await request({
        method: 'GET',
        path: `/customers/${customerId}`
    });

    return response.data;
};

export const updateCustomer = async (customerId: string, data: { customerData: Partial<CustomerData> }): Promise<DefaultResponse<Customer>> => {
    const response = await request({
        method: 'PATCH',
        path: `/customers/${customerId}`,
        body: data
    });

    return response.data;
}; 