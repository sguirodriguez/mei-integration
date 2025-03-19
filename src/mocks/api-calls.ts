import { v4 as uuidv4 } from 'uuid';

// Mock data
const mockCustomer = {
    uuid: uuidv4(),
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '11999999999',
    cpf: '12345678900',
    rg: '123456789',
    birthdate: '1990-01-01',
    rgEmissor: 'SSP',
    rgStateEmissor: 'SP',
    mothername: 'Jane Doe',
    zipcode: '01234567',
    street: 'Example Street',
    number: '123',
    complement: 'Apt 4B',
    district: 'Example District',
    city: 'Example City',
    state: 'SP',
    principalOcupation: { value: 'Developer', label: 'Developer' },
    secondaryOcupations: [{ value: 'Designer', label: 'Designer' }],
    actingType: { value: 'Technology', label: 'Technology' },
    customer_data: {
        // Additional customer data if needed
    }
};

const mockPaymentConfigs = {
    price: 199.90,
    creditCardFees: [
        { installments: 1, fee: 0 },
        { installments: 2, fee: 0.0599 },
        { installments: 3, fee: 0.0699 }
    ]
};

const mockPixPayment = {
    txid: uuidv4(),
    status: 'pending',
    key: 'mock-pix-key-00001122334455',
    qrCode: 'data:image/png;base64,mockedQRCodeBase64String',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    type: 'pix'
};

const mockCreditCardPayment = {
    txid: uuidv4(),
    status: 'complete',
    type: 'credit_card'
};

// Mock API calls
export const mockApiCalls = {
    // Create customer
    createCustomer: async (customerData: any) => {
        return {
            data: {
                isValid: true,
                result: {
                    ...mockCustomer,
                    ...customerData
                }
            }
        };
    },

    // Get payment configurations
    getPaymentConfigs: async () => {
        return {
            data: {
                isValid: true,
                result: mockPaymentConfigs
            }
        };
    },

    // Generate payment
    generatePayment: async (customerId: string, paymentData: any) => {
        const mockPayment = paymentData.type === 'pix' ? mockPixPayment : mockCreditCardPayment;

        return {
            data: {
                isValid: true,
                result: mockPayment
            }
        };
    },

    // Get payment details
    getPaymentDetails: async (txid: string) => {
        return {
            data: {
                isValid: true,
                result: {
                    ...mockPixPayment,
                    status: Math.random() > 0.5 ? 'complete' : 'pending' // Randomly simulate payment completion
                }
            }
        };
    },

    // Update customer credentials
    updateCustomerCredentials: async (customerId: string, credentials: any) => {
        return {
            data: {
                isValid: true,
                result: {
                    ...mockCustomer,
                    ...credentials
                }
            }
        };
    },

    // Get customer by ID
    getCustomerById: async (customerId: string) => {
        return {
            data: {
                isValid: true,
                result: mockCustomer
            }
        };
    },

    // Push UTM data
    pushUtmData: async (utmData: any) => {
        return {
            data: {
                isValid: true,
                result: {
                    ...utmData,
                    timestamp: new Date().toISOString()
                }
            }
        };
    }
};

