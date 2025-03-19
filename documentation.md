# API Documentation

## Configurações

### GET /payments/configs
Obtém configurações iniciais do sistema.

**Response 200**
```json
{
  "credit_card_fees": {
    "installments": [
      {
        "number": 1,
        "fee_percentage": number
      }
    ]
  },
  "prices": {
    "base_price": number,
    "discount_percentage": number
  }
}
```

## Clientes

### POST /customers
Cria ou atualiza informações do cliente.

**Request Body**
```json
{
  "personal_data": {
    "name": string,
    "cpf": string,
    "email": string,
    "phone": string,
    "birth_date": string,
    "address": {
      "zip_code": string,
      "street": string,
      "number": string,
      "complement": string,
      "neighborhood": string,
      "city": string,
      "state": string
    }
  },
  "business_data": {
    "company_name": string,
    "trading_name": string,
    "cnpj": string,
    "phone": string,
    "address": {
      "zip_code": string,
      "street": string,
      "number": string,
      "complement": string,
      "neighborhood": string,
      "city": string,
      "state": string
    }
  },
  "utm_data": {
    "source": string,
    "medium": string,
    "campaign": string,
    "term": string,
    "content": string
  },
  "service_id": string
}
```

**Response 201**
```json
{
  "customer_uuid": string,
  "status": "created"
}
```

### GET /customers/{customerId}
Recupera dados existentes do cliente.

**Path Parameters**
- customerId: string (UUID do cliente)

**Response 200**
```json
{
  "personal_data": {
    "name": string,
    "cpf": string,
    "email": string,
    "phone": string,
    "birth_date": string,
    "address": {
      "zip_code": string,
      "street": string,
      "number": string,
      "complement": string,
      "neighborhood": string,
      "city": string,
      "state": string
    }
  },
  "business_data": {
    "company_name": string,
    "trading_name": string,
    "cnpj": string,
    "phone": string,
    "address": {
      "zip_code": string,
      "street": string,
      "number": string,
      "complement": string,
      "neighborhood": string,
      "city": string,
      "state": string
    }
  }
}
```

## Pagamentos

### POST /payments/{customer_uuid}
Inicia o processo de pagamento.

**Path Parameters**
- customer_uuid: string (UUID do cliente)

**Request Body**
```json
{
  "payment_method": "credit_card" | "pix",
  "discount_code": string?,
  "credit_card_data?: {
    "holder_name": string,
    "number": string,
    "expiry_date": string,
    "cvv": string,
    "installments": number
  }
}
```

**Response 201 (Cartão de Crédito)**
```json
{
  "payment_id": string,
  "status": "processing" | "approved" | "declined",
  "transaction_id": string
}
```

**Response 201 (PIX)**
```json
{
  "payment_id": string,
  "txid": string,
  "qr_code": string,
  "qr_code_text": string,
  "expiration_date": string
}
```

### GET /payments/{txid}
Consulta o status do pagamento PIX.

**Path Parameters**
- txid: string (ID da transação PIX)

**Response 200**
```json
{
  "status": "pending" | "processing" | "complete" | "expired",
  "payment_date": string?,
  "payer_info": {
    "name": string?,
    "document": string?
  }
}
```

### PATCH /customers/{customer_uuid}
Atualiza as credenciais Gov.br do cliente.

**Path Parameters**
- customer_uuid: string (UUID do cliente)

**Request Body**
```json
{
  "govbr_credentials": {
    "cpf": string,
    "password": string
  }
}
```

**Response 200**
```json
{
  "status": "updated",
  "customer_uuid": string
}
```

## Serviços Externos

### GET https://viacep.com.br/ws/{cep}/json/
Serviço de consulta de CEP.

**Path Parameters**
- cep: string (CEP sem hífen)

**Response 200**
```json
{
  "cep": string,
  "logradouro": string,
  "complemento": string,
  "bairro": string,
  "localidade": string,
  "uf": string,
  "ibge": string,
  "gia": string,
  "ddd": string,
  "siafi": string
}
```

## Códigos de Erro Comuns

- 400: Bad Request - Parâmetros inválidos ou faltando
- 401: Unauthorized - Autenticação necessária
- 403: Forbidden - Sem permissão para acessar o recurso
- 404: Not Found - Recurso não encontrado
- 422: Unprocessable Entity - Dados válidos mas logicamente incorretos
- 500: Internal Server Error - Erro interno do servidor

## Observações
- Todas as requisições devem incluir o header `Content-Type: application/json`
- Datas devem ser enviadas no formato ISO 8601 (YYYY-MM-DD)
- Valores monetários são representados em centavos (integer)
- Todos os endpoints requerem autenticação via Bearer Token (exceto onde especificado) 