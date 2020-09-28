<template>
  <v-overlay :value="isLoading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Overlay',
  computed: {
    ...mapState({
      isLoading: (state) => state.basket.popups.isLoading,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
