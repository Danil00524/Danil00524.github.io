<template>
  <div>
    <div class="btn">
      <button @submit.prevent>
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'Кнопка',
    },
  },
};
</script>

<style lang="scss" scoped>
.btn button {
  background-color: #262626;
  border-radius: 4px;
  outline: none;
  border: none;
  font-family: 'MagistralC';
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 18px 33px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: $main;
  }
}

.personal__cabinet-new_project,
.module__where-to-buy-btn,
.configurator__position-selected-reset-btn,
.models__item-add_project {
  margin-top: -10px;
  & button {
    font-size: 13px;
    line-height: 15px;
    color: #a12c3a;
    background-color: transparent;
    border: 1px solid #a12c3a;
    padding: 12px 22px 10px 22px;
    transition: all 0.3s;
    &:hover {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
    &:active {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
}
.personal__cabinet-new_project.disable button {
  border: 1px solid #fff;
  color: #fff;
  background-color: #C4C4C4;
  cursor: not-allowed;
}

.order-sidebar_buttons button {
  padding: 11px 24px;
  font-family: 'MagistralC';
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffff;
}

.sidebar_projects_save button,
.sidebar_projects_check button {
  width: 100%;
  height: 37px;
  background: #fff;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 4px;
  color: #a12c3a;
  &:hover {
    background: #1D1D1D;
    color: #fff;
  }
}
.registration_btn .btn button,
.edit-profile__btn button {
  background-color: $white;
  padding: 12px 26px 10px 27px;
  border: 1px solid #a12c3a;
  font-family: 'MagistralC';
  font-size: 13px;
  letter-spacing: 0.1em;
  color: #a12c3a;
  &:hover {
    background-color: $black;
    color: $white;
    border: 1px solid $black;
  }
}

.edit-profile__btn button {
  background-color: transparent;
}
@media (max-width: 1050px) {
  .personal__cabinet-new_project {
    & button {
      white-space: nowrap;
    }
  }
}
@media (max-width: 340px) {
  .order-sidebar_buttons button {
    padding: 11px 16px;
  }
  .sidebar_projects_save button,
  .sidebar_projects_check button {
    max-width: 135px;
  }
}
</style>
