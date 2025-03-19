import { mockApiCalls } from "../mocks/api-calls";

export const exampleApiSequence = async () => {
    try {
        // 1. Get payment configs
        const configs = await mockApiCalls.getPaymentConfigs();
        console.log('Payment configs:', configs.data.result);

        // 2. Create customer
        const customerData = {
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            // ... other customer data
        };
        const customer = await mockApiCalls.createCustomer(customerData);
        console.log('Created customer:', customer.data.result);

        // 3. Generate PIX payment
        const pixPayment = await mockApiCalls.generatePayment(customer.data.result.uuid, { type: 'pix' });
        console.log('Generated PIX payment:', pixPayment.data.result);

        // 4. Check payment status (simulate polling)
        const paymentStatus = await mockApiCalls.getPaymentDetails(pixPayment.data.result.txid);
        console.log('Payment status:', paymentStatus.data.result);

        // 5. Update customer credentials after payment
        const updatedCustomer = await mockApiCalls.updateCustomerCredentials(customer.data.result.uuid, {
            govPassword: 'mockPassword123'
        });
        console.log('Updated customer:', updatedCustomer.data.result);

        // 6. Push UTM data
        const utmData = {
            acid: 'mock-acid',
            utms: {
                rcpSource: 'google',
                rcpMedium: 'cpc',
                rcpCampaign: 'summer_sale',
                rcpContent: 'banner_1',
                rcpTerm: 'mei registration'
            }
        };
        const utmResult = await mockApiCalls.pushUtmData(utmData);
        console.log('UTM data pushed:', utmResult.data.result);

    } catch (error) {
        console.error('Error in API sequence:', error);
    }
}; 