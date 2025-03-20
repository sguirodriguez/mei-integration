import { createCustomer, getCustomer } from "./api/customers";
import { getPaymentConfigs, createPayment, getPaymentStatus } from "./api/payments";
import { pushUtms } from "./api/utms";

const starting = async () => {

    //## Configuração Inicial
    //1. push utms
    const utms = await pushUtms({
        acid: '123',
        utms: {
            rcpSource: 'test',
            rcpMedium: 'test',
            rcpCampaign: 'test',
            rcpContent: 'test',
            rcpTerm: 'test'
        }
    });
    //2. Get payment configs
    const configs = await getPaymentConfigs();

    //## Fluxo do Cliente
    //1. Criar cliente/atualizar cliente
    const createdCustomer = await createCustomer({
        customerData: {
            fullName: "João da Silva",
            email: "joao.silva@example.com",
            phone: "(11) 91234-5678",
            cpf: "123.456.789-00",
            rg: "12.345.678-9",
            birthdate: "1990-05-15",
            rgEmissor: "SSP",
            rgStateEmissor: "SP",
            mothername: "Maria da Silva",
            zipcode: "01000-000",
            street: "Rua das Flores",
            number: "123",
            complement: "Apto 101",
            district: "Centro",
            city: "São Paulo",
            state: "SP",
            comercialAddressZipcode: "02000-000",
            comercialAddressStreet: "Av. Paulista",
            comercialAddressNumber: "1000",
            comercialAddressComplement: "Sala 502",
            comercialAddressDistrict: "Bela Vista",
            comercialAddressCity: "São Paulo",
            comercialAddressState: "SP",
            principalOcupation: "Desenvolvedor de Software",
            secondaryOcupations: ["Professor", "Consultor"],
            actingType: "Autônomo",
            govPassword: "SenhaSecreta123"
        }
    });
    //2. Obter Cliente (Opcional - para sessões continuadas)
    const customer = await getCustomer(createdCustomer.result.uuid);

    //## Fluxo de Pagamento
    //1. Gerar pagamento (credit_card)
    // const payment = await createPayment(customer.result.uuid, {
    //     type: 'credit_card',
    //     paymentData: {
    //         holderName: "João da Silva",
    //         cardNumber: "1234567890123456",
    //         expirationDate: "12/2024",
    //         securityCode: "123",
    //         installmentQuantity: 1
    //     }
    // });
    //1. Gerar pagamento (pix)
    const paymentPix = await createPayment(customer.result.uuid, {
        type: 'pix'
    });
    //2. Verificar Status do Pagamento (apenas PIX)
    const paymentStatus = await getPaymentStatus(paymentPix.result.txid);

    console.log('Customer and payment:', customer, paymentPix);
}

starting();

