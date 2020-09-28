<template>
  <v-dialog v-model="popupInfo.statusPopup" width="500">
    <v-card>
      <v-card-text> </v-card-text>

      <v-card-text>
        {{ popupInfo.text }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="$store.commit('basket/CLOSE_POPUP')"
        >
          {{ staticText.btns[2][actualLang.index] }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

export default {
  name: 'DefaultPopupOverlay',
  data() {
    return {
      langPanel: false,
      showUserMenu: false,
      linkForLoginUser: ['price'],
      showMobileBtn: false,
      mobileView: true,
      showNav: false,
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
