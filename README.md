# Venha para Recomb

O desafio é desenvolver um frontend para um módulo de pagamentos no sistema:

*Considere que:*
- Usuário (já “logado”) escolheu X produtos e clicou em “Pagar”

*Você deve criar:*
Uma página de pagamento (checkout) com múltiplos passos 
que possibilite ao usuário:

1 - Escolher a opção de pagamento:
	
 	* Cartão de Crédito
 	* Boleto
 	* Pix

2 - Preencher as informações adicionais dependendo do método:
	
 	* Cartão de Crédito: Escolha da bandeira e preenchimento das informações (Número de cartão, código CVV, data de vencimento mm/aaaa e Nome do titular, CPF/CNPJ) e número de parcelas
 	
  	* Boleto: CPF, Nome, Sobrenome e e-mail
	
 	* Pix: Deve pular a segunda etapa

3 - Visualizar o instrumento de pagamento:
	
 	* Cartão de Crédito: Página aguardando aprovação do pagamento pela operadora
	
 	* Boleto: Deve exibir o código de barras do boleto, data de vencimento e botão para download do pdf do boleto
	
 	* Pix: Deve exibir o QRCode e um contador decrescente para expiração do mesmo

4 - Visualizar o resumo da compra:
	
 	* Produtos comprados (foto, nome e descrição)
	
 	* Método de pagamento escolhido
	
 	* Data da compra
	
 	* Previsão de entrega

**Escolha as tecnologias que você vai usar e tente montar uma solução completa para rodar a aplicação.**

Para enviar o resultado, basta realiazar um Fork deste repositório e abra um Pull Request, com seu nome.

É importante comentar que deve ser enviado apenas o código fonte. Não aceitaremos códigos compilados.

Por fim, o candidato deve atualizar o Readme.md com as seguintes informações:
  
 1) Documentação da solução;
 2) Lista dos diferenciais implementados

## Avaliação

O programa será avaliado levando em conta os seguintes critérios:
|Critério                    |Valor   |
|----------------------------|--------|
|Legibilidade do Código 	   |10      |
|Documentação do código 	   |10      |
|Documentação da solução 	   |10      |
|Componentização             |10      |
|Preocupação com usabilidade |10      |
|Total 	                     |50      |

A pontuação do candidato será a soma dos valores obtidos nos critérios acima.

## Diferenciais

O candidato pode aumentar a sua pontuação na seleção implementando um ou mais dos itens abaixo:
|Item                              |Pontos Ganhos  |
|----------------------------------|---------------|
|Consumir API (válido mock)        |30             |
|Implementar Clean Code 	   |20             |
|Qualidade de Código com SonarQube |15             |
|Implementar testes unitários 	   |15             |
|Implementar testes e2e            |30             |
|Implementar integração continua   |10             |
|Implementar usando Vue            |10             |
|Implementar usado Quasar          |20             |  
|Total                             |150            |

A nota final do candidato será acrescido dos pontos referente ao item implementado corretamente.

## Penalizações

O candidato será desclassificado nas seguintes situações:

1) Submeter um solução que não funcione;
2) Não cumprir os critérios presentes no seção Avaliação;
3) Plágio;
