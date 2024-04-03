<template>
  <v-container>
    <div class="payment">
      <h1>Checkout</h1>
      <div class="checkout-container">
        <v-form ref="form" v-if="step === 1" style="justify-content: center; display: grid; ">
          <h2 class="payment-options-title">Escolha a opção de pagamento:</h2>
          <div class="payment-option-container">
            <div v-for="option in paymentOptions" :key="option.method" class="payment-option">
              <img :src="option.icon" :alt="option.alt">
              <button class="payment-buttons" @click="choosePayment(option.method)">{{ option.label }}</button>
            </div>
          </div>
        </v-form>

        <div v-else-if="step === 2">

          <div style="justify-content: center; display: grid; ">

            <div class="container-back-button">
              <v-img class="back-button-img" @click="SET_STEP(1)" :src="require('@/assets/back.png')"
                alt="voltar"></v-img>
            </div>
            <h2 v-if="paymentMethodFormComponent !== 'PixForm'" class="title-information">Preencher informações
              adicionais:</h2>

            <component :is="paymentMethodFormComponent" ref="form"></component>
            <v-btn class="confirm-credit-payment" type="submit" @click="confirmPayment">Confirmar Pagamento</v-btn>
            <div class="alert-container" v-if="errorMessage">
              <v-alert border="right" color="red" dense dismissible elevation="9" type="error"
                v-if="errorMessage && paymentMethodFormComponent !== 'PixForm'">
                Preencha o Formulário
              </v-alert>
            </div>
          </div>
        </div>

        <div v-else-if="step === 3">
          <div style="justify-content: center; display: grid; ">
            <div class="container-back-button">
              <v-img class="back-button-img" @click="SET_STEP(1)" :src="require('@/assets/back.png')"
                alt="voltar"></v-img>
            </div>
            <p class="success-message">Pagamento efetuando com sucesso!</p>

            <div>
              <div class="purchase-summary ">
                <p> Resumo da compra</p>
              </div>
              <v-card class="mx-auto" max-width="500" outlined>

                <v-list-item three-line>
                  <v-list-item-content>

                    <div class="list-item-title-container">
                      <v-list-item-title class="text-h5 mb-1">
                        AirPods Max
                      </v-list-item-title>
                      <span class="span">Preço: <v-list-item-subtitle> R$:{{ formatPrice(prices['AirPods Max'])
                          }}</v-list-item-subtitle>
                      </span>
                      <v-list-item-subtitle class="description-subtitle">
                        É preciso ter os AirPods Max com a versão mais recente do software e os modelos de iPhone e iPod
                        touch com a versão mais recente do iOS;</v-list-item-subtitle>


                    </div>
                  </v-list-item-content>


                  <v-img style=" background-size: contain!important;" height="100px" width="0"
                    src="@/assets/airpods-max.png"></v-img>

                </v-list-item>

                <v-divider></v-divider>

                <v-list-item three-line>
                  <v-list-item-content>

                    <div class="list-item-title-container">
                      <v-list-item-title class="text-h5 mb-1">
                        AirPods (3ª geração)
                      </v-list-item-title>
                      <span class="span">Preço: <v-list-item-subtitle>R$ {{ formatPrice(prices['AirPods (3ª geração)'])
                          }}</v-list-item-subtitle>
                      </span>
                      <v-list-item-subtitle class="description-subtitle">
                        Os AirPods são leves e oferecem ajuste arredondado. Eles se acomodam no ângulo ideal para
                        proporcionar conforto e direcionar melhor o áudio para seus ouvidos.</v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                  <v-img style=" background-size: contain!important;" height="100px" width="0"
                    src="@/assets/airpods.png"></v-img>

                </v-list-item>
                <v-divider></v-divider>
                <v-list-item three-line>
                  <v-list-item-content>

                    <div class="list-item-title-container">
                      <v-list-item-title class="text-h5 mb-1">
                        iPhone 15 Pro
                      </v-list-item-title>
                      <span class="span">Preço: <v-list-item-subtitle>R$ {{ formatPrice(prices['iPhone 15 Pro'])
                          }}</v-list-item-subtitle>
                      </span>
                      <v-list-item-subtitle class="description-subtitle">
                        Titânio com a parte de trás em vidro matte texturizado, Botão de Ação, Alcance de zoom óptico,
                        Tela Super Retina XDR nota de rodapé ¹, SOS de Emergência

                        Detecção de Acidente nota de rodapé ³...

                      </v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                  <v-img style=" background-size: contain!important;" height="100px" width="0"
                    src="@/assets/iphone.png"></v-img>

                </v-list-item>
                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content class="payment-information-container">
                    <p>Método de pagamento: {{ step === 3 ? getPaymentMethodLabel(paymentMethod) : 'Boleto' }}</p>
                    <p>Data da compra: {{ formatDate(new Date()) }}</p>
                    <p>Previsão de entrega: {{ calculateDeliveryDate() }}</p>
                    <p class="purchase-price">Valor da compra:
                      <span class="purchase-price-span">{{ formatPrice(calculateTotalPrice()) }}</span>
                    </p>
                  </v-list-item-content>
                </v-list-item>

              </v-card>

            </div>
          </div>

        </div>

        <div v-else-if="step === 4">
          <h2 class="title-information">Passo 4: Conclusão do pagamento</h2>
          <p>Aqui você pode adicionar qualquer conteúdo relacionado à conclusão do pagamento.</p>
        </div>


      </div>

    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CreditCardForm from './CreditCardForm.vue';
import BoletoForm from './BoletoForm.vue';
import PixForm from './PixForm.vue';

export default {
  name: 'PaymentCheckout',
  data() {
    return {
      errorMessage: '',
      totalPurchasePrice: 0,

      prices: {
        'AirPods Max': 6590,
        'AirPods (3ª geração)': 1899,
        'iPhone 15 Pro': 10999,
      },
    }
  },
  computed: {
    ...mapState(['step', 'paymentMethod', 'paymentOptions']),
    paymentMethodFormComponent() {
      if (this.paymentMethod) {
        return this.paymentOptions.find(option => option.method === this.paymentMethod).formComponent;
      }
      return null;
    },

  },
  methods: {
    ...mapMutations(['SET_STEP', 'SET_PAYMENT_METHOD']),
    choosePayment(method) {
      this.SET_PAYMENT_METHOD(method);
      this.SET_STEP(2);
    },
    confirmPayment() {
      if (this.$refs.form.validate()) {
     
        this.SET_STEP(3);
      } else {
        this.errorMessage = 'Preencha todo o Formulário ';
        this.clearErrorMessage(); 
        this.clearAlert(); 
      }
    },
    clearErrorMessage() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000); 
    },
    clearAlert() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000); 
    },
    confirmPaymentPix() {

      this.SET_STEP(3);

    },
    formatPrice(price) {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
    calculateTotalPrice() {
      return Object.values(this.prices).reduce((acc, curr) => acc + curr, 0);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('pt-BR', options);
    },
    calculateDeliveryDate() {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7); 
      return this.formatDate(deliveryDate);
    },
    getPaymentMethodLabel(method) {
      if (method === 'cartao') {
        return 'Cartão de Crédito';
      } else if (method === 'boleto') {
        return 'Boleto';
      } else if (method === 'pix') {
        return 'Pix';
      } else {
        return 'Método de pagamento não especificado';
      }
    }

  },
  components: {
    CreditCardForm,
    BoletoForm,
    PixForm,
  },
}
</script>


<style scoped>
.checkout-container {
  padding-top: 74px;
}

#app>div>div>div>div>div>div:nth-child(1)>img,
#app>div>div>div.container>div>div>form>div>div:nth-child(2)>img,
#app>div>div>div>div>div>div:nth-child(3)>img {
  height: 30px !important;
  width: 30px !important;
}

.payment-option {
  display: flex;
  padding-bottom: 10px;
}

.payment-buttons {
  margin-left: 10px;
  cursor: pointer;
}

.confirm-credit-payment {
  height: 40px;
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0);
  padding: 10px;
  border-radius: 5px;
}

.title-information {
  padding-bottom: 20px;
}

.alert-container {
  padding-top: 20px;
}

.alert {
  color: white;
}


.back-button-img {
  width: 20px;
  cursor: pointer
}

.success-message {
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.list-item-title-container {
  text-align: start;
}

.v-list-item__content>:not(:last-child) {
  font-size: 14px;
  font-weight: bold;
}

.v-image__image {
  width: 100px !important;
  height: 0px;

}

.v-image__image--cover {
  background-size: contain !important;
}

::v-deep .v-image__image--cover {
  background-size: contain !important;
}

.span {
  display: flex;
  font-weight: 400;
  font-size: 14px;
}

.description-subtitle {
  padding-top: 10px;
}

.v-application .text-h5 {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}

.theme--light.v-sheet--outlined {
  box-shadow: 0 2px 4px rgb(0 0 0 / 21%);
}

.purchase-summary {
  font-weight: bold;
}

.payment-information-container {
  text-align: start;
  font-size: 14px;
}

.purchase-price {
  font-size: 14px;
  padding-top: 10px;
}

.purchase-price-span {
  font-weight: 600;
}

.confirm-credit-payment {
  border: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 21%);

}

.v-btn__content {
  font-size: 10px;
  font-weight: bold !important;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #272727;
  color: white;
}

.payment-options-title {
  padding-bottom: 50px;
}
</style>
