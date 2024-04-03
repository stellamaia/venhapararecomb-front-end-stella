import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 1,
    paymentMethod: null,
    paymentOptions: [
      {
        method: 'cartao',
        label: 'Cartão de Crédito',
        icon: require('@/assets/credit-card.png'),
        alt: 'Ícone de cartão de crédito',
        formComponent: 'CreditCardForm',
        styleClass: 'pix-icon',
      },
      {
        method: 'boleto',
        label: 'Boleto',
        icon: require('@/assets/boleto.jpg'),
        alt: 'Ícone de boleto',
        formComponent: 'BoletoForm',
        styleClass: 'pix-icon',
      },
      {
        method: 'pix',
        label: 'Pix',
        icon: require('@/assets/pix-icon.png'),
        alt: 'Ícone de Pix',
        formComponent: 'PixForm',
        styleClass: 'pix-icon',
      },
    ]
  },
  getters: {
  },
  mutations: {
    SET_STEP(state, step) {
      state.step = step;
    },
    SET_PAYMENT_METHOD(state, method) {
      state.paymentMethod = method;
    },
  },
  actions: {
  },
  modules: {
  }
})
