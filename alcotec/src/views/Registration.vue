<template>
  <div class="registration">
    <div class="custom-container">
      <div class="main__registration-wrapper">
        <RegistrationTitle />
        <div class="main__registration-inner">
          <RegistrationForm />
          <RegistrationRight />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationTitle from '../components/Registration/RegistrationTitle.vue';
import RegistrationForm from '../components/Registration/RegistrationForm.vue';
import RegistrationRight from '../components/Registration/RegistrationRight.vue';

export default {
  name: 'Registration',
  components: {
    RegistrationTitle,
    RegistrationForm,
    RegistrationRight,
  },
};
</script>

<style lang="scss">
.registration {
  background-color: #fff;
}
.main__registration {
}
.main__registration-wrapper {
  padding-top: 48px;
  padding-bottom: 401px;
}
.main__registration-inner {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 1240px) {
  .main__registration-inner {
    flex-direction: column;
  }
}
@media (max-width: 920px) {
  .main__registration-wrapper {
    padding-bottom: 48px;
  }
}
</style>
