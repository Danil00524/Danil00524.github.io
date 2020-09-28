<template>
  <label
    v-if="!disable"
    class="checkbox"
    :class="{ disableLayout: !availability }"
  >
    <input
      v-if="availability"
      :id="id"
      class="checkbox__input visually-hidden"
      type="checkbox"
      :checked="checked"
      :name="name"
      @change="$emit('change', $event.target.checked)"
    />
    <input
      v-else
      :id="id"
      class="checkbox__input visually-hidden"
      :name="name"
    />
    <div class="checkbox__fake">
      <svg class="checkbox__img" viewBox="0 0 120.4 80.2">
        <polyline points="0,40.1 40.2,80.2 120.4,0 " />
      </svg>
    </div>
    <div v-if="text.length" class="checkbox__text">{{ text }}</div>
  </label>
  <label v-else class="checkbox disable" :class="{ disableLayout: !availability }">
    <input
      v-if="availability"
      :id="id"
      class="checkbox__input visually-hidden"
      type="checkbox"
      :checked="true"
      :name="name"
    />
    <input
      v-else
      :id="id"
      class="checkbox__input visually-hidden"
      :name="name"
    />
    <div class="checkbox__disable">
      <svg class="checkbox__img" viewBox="0 0 120.4 80.2">
        <polyline points="0,40.1 40.2,80.2 120.4,0 " />
      </svg>
    </div>
    <div v-if="text.length" class="checkbox__text">{{ activeText }}</div>
  </label>
</template>
<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      default: 'check',
    },
    name: {
      type: String,
      default: 'check',
    },
    text: {
      type: String,
      default: '',
    },
    activeText: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
.checkbox {
  &.disableLayout {
    color: #9b9b9b;
    cursor: not-allowed;
    & button {
      cursor: not-allowed;
    }
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  &.disable {
    cursor: not-allowed;
  }
  &__fake {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__disable {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkbox__img {
    display: block;
    width: 11px;
    height: 10px;
    stroke: $white;
    fill: none;
    stroke-width: 15px;
    stroke-dasharray: 170;
    stroke-dashoffset: 170;
  }
  &__input:checked ~ &__fake {
    background-color: $gold;
    border: 1px solid $gold;
    .checkbox__img {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.3s;
    }
  }
  &__input ~ &__disable {
    background-color: $gold;
    border: 1px solid $gold;
    .checkbox__img {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.3s;
    }
  }
  &__text {
    margin-left: 10px;
  }
}
</style>
