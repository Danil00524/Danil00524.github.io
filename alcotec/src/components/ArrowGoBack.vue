<template>
  <span class="icon-arrow-back" @click.prevent="goBack"></span>
</template>

<script>
export default {
  name: 'ArrowGoBack',
  props: {
    backRoutePath: {
      type: String,
      default: '/',
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.backRoutePath);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-arrow-back {
  cursor: pointer;
  margin-right: 36px;
  font-size: 30px;
  margin-top: 3px;
  &:before {
    transition: all 0.3s;
  }
  &:hover:before {
    color: #000;
  }
}

@media (max-width: 510px) {
  .icon-arrow-back {
    margin-right: 25px;
  }
}

@media (max-width: 340px) {
  .icon-arrow-back {
    margin-right: 10px;
  }
}
</style>
