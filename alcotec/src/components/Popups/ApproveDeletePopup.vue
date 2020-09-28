<template>
  <div>
    <v-dialog v-model="dialog" max-width="520px">
      <div class="module__thanks">
        <span
          class="module__enter-client-close"
          @click.prevent="dialog = false"
        ></span>
        <div class="module__thanks-inner">
          <div class="module__thanks-title">
            {{ staticText.popups.popupTitleProject[actualLang.index] }}
          </div>
          <div class="models_add__popup">
            <a @click.stop="deleteProject(projectId)">
              {{ staticText.popups.popupTextYes[actualLang.index] }}
            </a>
            <a @click.prevent="dialog = false">
              {{ staticText.popups.popupTextNo[actualLang.index] }}
            </a>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../../store';

import { staticText } from '../../i18n';

export default {
  name: 'ApproveDeletePopup',
  data() {
    return {
      projectId: null,
      dialog: false,
      staticText,
    };
  },
  computed: {
    ...mapState({
      projects: (state) => state.projects.projects,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    projectDeletePopup(id) {
      this.dialog = true;
      this.projectId = id;
    },
    deleteProject(id) {
      store.dispatch('projects/deleteProject', id);
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.models_add__popup {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  & a {
    transition: all .4s;
    text-align: center;
    max-width: 140px;
    width: 100%;
    height: 40px;
    font-size: 13px;
    line-height: 15px;
    color: #a12c3a;
    background-color: transparent;
    border: 1px solid #a12c3a;
    padding: 12px 22px 10px 22px;
    margin-right: 7.5px;

    &:hover {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
  & a:last-child {
    margin-left: 7.5px;
    margin-right: 0px;
  }
}

.module__thanks {
  border-radius: 1px;
  max-width: 520px;
  width: 100%;
  background-color: #fff;
}
.module__enter-client-inner,
.module__recovery-password-inner,
.module__thanks-inner {
  padding: 60px 48px 48px 48px;
  & form {
    & label {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      text-transform: uppercase;
      color: #9b9b9b;
      width: 57px;
      height: 18px;
      padding-left: 20px;
      & input {
        display: block;
        margin-bottom: 48px;
        margin-top: 6px;
        max-width: 424px;
        width: 100%;
        padding: 17px;
        font-size: 16px;
        line-height: 22px;
        color: #1d1d1d;
        outline: none;
        border: 1px solid #9b9b9b;
        border-radius: 4px;
      }
    }
    .module__enter-client-input-password {
      & input {
        margin-bottom: 8px;
      }
    }
    .module__enter-client-input-btn {
      & input[type='submit'] {
        border: 1px solid #a12c3a;
        border-radius: 4px;
        font-family: 'MagistralC';
        font-size: 15px;
        line-height: 17px;
        text-align: center;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #a12c3a;
        font-weight: bold;
        cursor: pointer;
        background-color: #fff;
        transition: all 0.3s;
        &:hover {
          background-color: #1d1d1d;
          color: #fff;
          border: 1px solid #1d1d1d;
        }
      }
    }
    & a {
      margin-bottom: 26px;
      padding-left: 20px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
      transition: all 0.3s;
      &:hover {
        color: #a12c3a;
      }
    }
  }
}
.module__enter-client-close {
  cursor: pointer;
  display: block;
  position: relative;
  &::before {
    top: 24px;
    right: 24px;
    content: '\e913';
    font-family: 'icomoon';
    color: #9b9b9b;
    font-size: 32px;
    position: absolute;
  }
  &:hover:before {
    transition: all 0.3s;
    color: #000;
  }
}
.module__enter-client-title,
.module__recovery-password-title,
.module__thanks-title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  text-align: center;
  padding-bottom: 48px;
  font-weight: bold;
}
.module__recovery-password-title {
  padding-bottom: 16px;
}
.module__recovery-password-subtitle,
.module__thanks-subtitle {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #9b9b9b;
  padding-bottom: 42px;
}
.module__thanks-subtitle {
  padding-bottom: 0;
}
.module__enter-client-application {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #1d1d1d;
  & span {
    & a {
      font-family: 'MagistralC';
      font-size: 16px;
      line-height: 18px;
      color: #a12c3a;
      padding-left: 16px;
      transition: all 0.3s;
      &:hover {
        color: #1d1d1d;
      }
    }
  }
}
.module__recovery-password-inner {
  padding: 60px 48px 60px 48px;
  & form {
    & label {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      text-transform: uppercase;
      color: #9b9b9b;
      width: 57px;
      height: 18px;
      padding-left: 20px;
      & input {
        display: block;
        margin: 0 auto;
        margin-bottom: 32px;
        margin-top: 6px;
        max-width: 424px;
        width: 100%;
        padding: 17px;
        font-size: 16px;
        line-height: 22px;
        color: #1d1d1d;
        outline: none;
        border: 1px solid #9b9b9b;
        border-radius: 4px;
      }
    }
    .module__recovery-password-input-btn {
      padding: 0;
      & input[type='submit'] {
        border: 1px solid #a12c3a;
        border-radius: 4px;
        font-family: 'MagistralC';
        font-size: 15px;
        line-height: 17px;
        text-align: center;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #a12c3a;
        margin: 0;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
.module__thanks-title {
  padding-top: 36px;
  padding-bottom: 16px;
}
</style>
