# Sequência de Integração da API

## Configuração Inicial
1. Carregar Configurações
   - Endpoint: `GET /payments/configs`
   - Objetivo: Obtém configurações iniciais incluindo preços e taxas de cartão de crédito
   - Quando: Na montagem do componente

## Fluxo do Cliente
1. Criar/Atualizar Cliente
   - Endpoint: `POST /customers`
   - Objetivo: Cria ou atualiza informações do cliente
   - Quando: Após completar informações pessoais e empresariais (Etapa 2)
   - Payload inclui:
     - Dados pessoais do cliente
     - Dados de rastreamento UTM
     - Tipo de serviço (parâmetro sid)

2. Obter Cliente (Opcional - para sessões continuadas)
   - Endpoint: `GET /customers/{customerId}`
   - Objetivo: Recupera dados existentes do cliente
   - Quando: Ao continuar de uma sessão anterior com parâmetro '?continue='

## Fluxo de Pagamento
1. Gerar Pagamento
   - Endpoint: `POST /payments/{customer_uuid}`
   - Objetivo: Inicia o processo de pagamento
   - Quando: Após selecionar o método de pagamento (Etapa 3)
   - Suporta:
     - Pagamento com Cartão de Crédito
     - Pagamento via PIX
   - Inclui parâmetro de desconto se aplicável

2. Verificar Status do Pagamento (apenas PIX)
   - Endpoint: `GET /payments/{txid}`
   - Objetivo: Consulta o status do pagamento
   - Quando: A cada 5 segundos após início do pagamento PIX
   - Continua até que o status seja 'complete'

## Etapa Final
1. Atualizar Credenciais Gov.br do Cliente
   - Endpoint: `PATCH /customers/{customer_uuid}`
   - Objetivo: Atualiza o cliente com credenciais Gov.br
   - Quando: Após pagamento bem-sucedido (Etapa 4)
   - Payload inclui:
     - CPF
     - Senha Gov.br

## Serviços Adicionais
- Integração ViaCEP
  - Serviço externo para busca de endereços
  - Chamado quando o CEP é inserido (8 dígitos)
  - Usado para endereços pessoais e comerciais

## Observações
- Todos os endpoints devem tratar respostas de erro adequadamente
- Consulta de status de pagamento é específica para pagamentos PIX
- Parâmetros UTM são rastreados durante todo o fluxo
- Validação de endereço acontece em tempo real conforme entrada do usuário 