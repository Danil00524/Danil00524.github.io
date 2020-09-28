<template>
  <div class="addressSelect">
    <div
      class="addressSelect-title"
      @click="showOfficesList = !showOfficesList"
    >
      <span class="addressSelect-title-text">{{
        addresses[actualAddress].title[actualLang.index]
      }}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.66666 6.6665L7.99999 9.99975L11.3333 6.6665H4.66666Z"
          fill="white"
        />
      </svg>
      <div v-if="showOfficesList" class="addressSelect-title-list">
        <div
          v-for="(office, key) of addresses"
          :key="key"
          class="addressSelect-title-list-item"
          @click="changeActualAddress(key)"
        >
          <span>{{ office.title[actualLang.index] }}</span>
        </div>
      </div>
    </div>
    <div class="addressSelect-info">
      <div class="addressSelect-info-phone">
        <span>{{ addresses[actualAddress].phone }}</span>
      </div>
      <div class="addressSelect-info-location">
        <span>{{ addresses[actualAddress].address[actualLang.index] }}</span>
      </div>
      <div class="addressSelect-info-timetable">
        <span class="addressSelect-info-timetable-days">{{
          addresses[actualAddress].days[actualLang.index]
        }}</span>
        <br />
        <span class="addressSelect-info-timetable-time">{{
          addresses[actualAddress].time[actualLang.index]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddressSelect',
  props: {
    addresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      actualAddress: 0,
      showOfficesList: false,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    changeActualAddress(index) {
      this.actualAddress = index;
    },
  },
};
</script>

<style scoped lang="scss">
.addressSelect {
  color: $white;
  &-title {
    font-family: 'MagistralC', sans-serif;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    color: $white;
    font-weight: bold;
    width: fit-content;

    &-text {
      margin-right: 24px;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }

    &-list {
      position: absolute;
      top: 100%;
      left: -15px;
      right: 0px;
      border-radius: 5px;
      background-color: $main;
      color: $white;
      padding: 15px;
      width: 200px;
      max-height: 100px;
      overflow: auto;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);

      scrollbar-color: #fff transparent;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba($color: #fff, $alpha: 1);
      }
      &-item {
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          opacity: 0.8;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &-info {
    // padding-right: 15px;

    &-phone {
      margin-top: 10px;
      font-weight: 300;
      font-size: 24px;
      line-height: 30px;
    }
    &-location {
      margin-top: 25px;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
    }
    &-timetable {
      margin-top: 25px;
      &-days {
        font-family: 'MagistralC', sans-serif;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
      }
      &-time {
        margin-top: 8px;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
      }
    }
  }
}
</style>
