<template>
  <h1></h1>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HandlerSaveProject',
  computed: {
    ...mapState({
      basket: (state) => state.basket.basket,
      numberProject: (state) => state.basket.numberProject,
      comment: (state) => state.basket.commentProject,
    }),
  },
  methods: {
    handlerSaveProject() {
      // Получаем только те данные, которые нужны Back-End'у.
      const basket = this.basket.map((e) => {
        return {
          id: e.totalInfo.id,
          priceUAH: e.totalInfo.priceUAH,
          sale: e.totalInfo.sale,
          count: e.totalInfo.addedToBasket,
        };
      });

      const project = {};

      if (this.numberProject) {
        project.id = this.numberProject;
      }
      project.comment = this.comment;
      project.products = basket;
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      this.$store.commit('basket/SET_POPUP_IS_LOADING');
      this.$store.dispatch('projects/sendingDataProject', {
        url: 'project',
        project,
        token,
        cb: (data) => {
          if (data.success) {
            this.$store.commit('basket/SET_POPUP', data);
            this.$store.commit('basket/SET_BASKET', []);
            this.$store.commit('basket/SET_TOTAL_PRICE');
            this.$store.commit('basket/SET_POPUP_IS_LOADING');
            this.$store.commit('basket/SET_COMMENT_PROJECT', '');

            localStorage.projectComment = '';
            localStorage.projectId = null;
            localStorage.productBasket = [];
            this.$router.push(
              `/profile/projects/project/${data.numberProject}`,
            );
          } else {
            this.$store.commit('basket/SET_POPUP', data);
            this.$store.commit('basket/SET_POPUP_IS_LOADING');
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
