export interface DefaultResponse<T> {
    isValid: boolean;
    result: T;
    message?: string;
}

export interface PaymentConfig {
    price: number;
    creditCardFees: number[];
}

export interface CustomerData {
    fullName: string;
    email: string;
    phone: string;
    cpf: string;
    rg: string;
    birthdate: string;
    rgEmissor: string;
    rgStateEmissor: string;
    mothername: string;
    zipcode: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    comercialAddressZipcode?: string;
    comercialAddressStreet?: string;
    comercialAddressNumber?: string;
    comercialAddressComplement?: string;
    comercialAddressDistrict?: string;
    comercialAddressCity?: string;
    comercialAddressState?: string;
    principalOcupation?: string;
    secondaryOcupations?: string[];
    actingType?: string;
    govPassword?: string;
}

export interface PaymentData {
    type: 'credit_card' | 'bill' | 'pix';
    paymentData?: {
        holderName: string;
        cardNumber: string;
        expirationDate: string;
        securityCode: string;
        installmentQuantity: number;
    };
    discount?: string;
}

export interface PaymentResponse {
    status: 'pending' | 'complete' | 'failed';
    txid: string;
    error?: boolean;
    message?: string;
    text?: string;
    key?: string;
    qrCode?: string;
    dueDate?: string;
    BankSlipUrl?: string;
}

export interface Customer extends CustomerData {
    uuid: string;
    customer_data: CustomerData;
} 