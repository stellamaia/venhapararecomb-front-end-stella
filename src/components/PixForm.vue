<template>
  <div class="pix-container">
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="validate">

      <p class="title-pix" for="chave">Pix:</p>
      <p class="information-pix">Código QR code para pagamento</p>

      <div class="qrcode-image-container">
        <v-img class="qrcode-image" src="@/assets/qr-code.png" alt="imagem QR code"></v-img>
        <p>Tempo restante para pagar {{ timeLeft }} </p>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'PixForm',
  data() {
    return {

      valid: false,
      timeLeft: '15:00'

    }
  }, created() {
    this.startTimer();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  computed: {
    timeLeftFormatted() {
      const [minutes, seconds] = this.timeLeft.split(':');
      return `${minutes}:${seconds}`;
    }
  },
  methods: {
    validate() {
      return true;
    },
    startTimer() {
      this.timer = setInterval(() => {
        const [minutes, seconds] = this.timeLeft.split(':');
        let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

        if (totalSeconds > 0) {
          totalSeconds--;
          const updatedMinutes = Math.floor(totalSeconds / 60);
          const updatedSeconds = totalSeconds % 60;
          this.timeLeft = `${updatedMinutes}:${updatedSeconds < 10 ? '0' : ''}${updatedSeconds}`;
        } else {
          clearInterval(this.timer);
          console.log('Tempo expirado!');
        }
      }, 1000);
    }
  },
}
</script>
<style scoped>
.title-pix {
  font-size: 20px;
  font-weight: bold;

}

.information-pix {
  font-size: 15px;
  padding-bottom: 40px;
}

.qrcode-image-container {
  display: inline-block;
}

.qrcode-image {
  width: 220px !important;

}

#app>div>div>div.container>div>div>div>div>div.alert-container>div {
  display: none;
}

::v-deep.title-information {
  display: none;
}
</style>