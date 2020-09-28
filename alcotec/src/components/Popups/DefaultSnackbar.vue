<template>
  <v-snackbar v-model="popupInfo.statusSnackbar" :timeout="4000">
    {{ popupInfo.text }}
    <v-btn color="blue" text @click="$store.commit('basket/CLOSE_SNACKBAR')">
      {{ staticText.btns[1][actualLang.index] }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

export default {
  name: 'DefaultSnackbar',
  data() {
    return {
      staticText,
    };
  },
  computed: {
    ...mapState({
      popupInfo: (state) => state.basket.popups,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
