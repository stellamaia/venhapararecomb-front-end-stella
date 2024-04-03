<template>
<!-- teste -->
  <div>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="cpf" :counter="11" label="CPF" :rules="cpfRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="name" label="Nome" :rules="nameRules" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="lastName" label="Sobrenome" :rules="lastNameRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpf: '',
      name: '',
      lastName: '',
      email: '',
      cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => (v && v.length === 11) || 'CPF deve conter 11 dígitos'
      ],
      nameRules: [
        v => !!v || 'Nome é obrigatório'
      ],
      lastNameRules: [
        v => !!v || 'Sobrenome é obrigatório'
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
      ]
    };
  },
  methods: {
    validate() {
      const fields = [this.cpf, this.name, this.lastName, this.email];
      const isAllFieldsFilled = fields.every(field => field);

      if (isAllFieldsFilled) {
        this.$emit('set-step', 3);
        return true;
      }

      this.$emit('show-error-message', 'Preencha todos os campos obrigatórios');
      return false;
    }
  }
};
</script>

<style scoped>
.text-field {
  background: rgb(238, 236, 236);
  outline: none;
  height: 25px;
}
</style>
