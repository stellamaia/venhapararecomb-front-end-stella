<template>
  <div class="credit-card-container">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select v-model="flags" :items="listFlags" label="Bandeira" :rules="flagsRules"></v-select>
      <v-text-field v-model="number" :rules="numberRules" label="Número do Cartão" required></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="cvv" :counter="3" label="CVV" :rules="cvvRules" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="expiryDate" label="Vencimento" :rules="expiryDateRules" required
            hint="Formato: MM/YYYY"></v-text-field>
        </v-col>
      </v-row>
      <v-text-field v-model="name" label="Nome" :rules="nameRules" required></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="cpf" :counter="11" label="CPF" :rules="cpfRules" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="cnpj" :counter="14" label="CNPJ" :rules="cnpjRules" required></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listFlags: ['Mastercard', 'Visa'],
      flags: '',
      number: '',
      cvv: '',
      expiryDate: '',
      name: '',
      cpf: '',
      cnpj: '',
      valid: false,
      flagsRules: [
        v => !!v || 'Bandeira é obrigatória',
      ],
      numberRules: [
        value => !!value || 'Número do cartão é obrigatório',
        value => {
          const cleanedNumber = value.replace(/\s|-/g, '');
          if (!cleanedNumber.match(/^\d{13,16}$/)) {
            return 'Número do cartão inválido. Deve ter entre 13 e 16 dígitos.';
          }
          return true;
        }
      ],
      cvvRules: [
        v => !!v || 'CVV é obrigatório',
        v => v.length === 3 || 'CVV deve ter 3 dígitos'
      ],
      expiryDateRules: [
        v => !!v || 'Data de validade é obrigatória',
        v => /^(0[1-9]|1[0-2])\/20[2-9][0-9]$/.test(v) || 'Formato de data inválido (MM/YYYY)'
      ],
      nameRules: [
        v => !!v || 'Nome é obrigatório',
      ],
      cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => v.length === 11 || 'CPF deve conter 11 dígitos'
      ],
      cnpjRules: [
        v => !!v || 'CNPJ é obrigatório',
        v => v.length === 14 || 'CNPJ deve ter 14 dígitos'
      ],
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('set-step', 3);
        return true;
      } else {
        this.$emit('show-error-message', 'Preencha todo o formulário corretamente');
        return false;
      }
    }
  }
};
</script>

<style scoped>
.credit-card-container {
  padding-bottom: 40px;
}
</style>
