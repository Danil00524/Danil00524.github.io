<template>
  <button @click.prevent="addInProject(item)">
    {{ text }}
  </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BtnAddToBasket',
  components: {},
  props: {
    text: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      basket: (state) => state.basket.basket,
    }),
  },
  methods: {
    addInProject(item) {
      this.$store.dispatch('basket/getProduct', {
        id: item.id,
        cb: (data) => {
          let { addedToBasket, sale, priceUAH, id } = data.totalInfo;

          let flag = true;

          const productBasket = JSON.parse(localStorage.productBasket || '[]');

          this.basket.forEach((elem, index) => {
            if (id === elem.totalInfo.id) {
              flag = false;
              elem.totalInfo.addedToBasket += 1;
              this.$store.commit(
                'basket/APPEND_TOTAL_PRICE',
                sale ? sale : priceUAH,
              );

              productBasket[index].addedToBasket = elem.totalInfo.addedToBasket;

              try {
                localStorage.productBasket = JSON.stringify(productBasket);
              } catch (e) {
                alert('Очистите LocalStorage.');
              }

              return;
            }
          });

          if (flag) {
            data.totalInfo.addedToBasket += 1;
            const addedProduct = {
              id: data.totalInfo.id,
              addedToBasket: data.totalInfo.addedToBasket,
            };

            productBasket.push(addedProduct);
            try {
              localStorage.productBasket = JSON.stringify(productBasket);
            } catch (e) {
              alert('Очистите LocalStorage.');
            }

            this.$store.commit('basket/UPDATE_BASKET', data);
            this.$store.commit(
              'basket/APPEND_TOTAL_PRICE',
              data.totalInfo.sale
                ? data.totalInfo.sale
                : data.totalInfo.priceUAH,
            );
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
