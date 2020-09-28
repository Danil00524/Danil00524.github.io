<template>
  <div class="socialLinks p4">
    <div class="socialLinks-before"></div>
    <div class="socialLinks-items">
      <a href="https://www.instagram.com/alcotec_club/" class="socialLinks-item" target="_blank">
        <span class="icon-inst-icon-black"></span>
        <span>Instagram</span>
      </a>
      <a href="https://www.facebook.com/alcotec.com.ua" class="socialLinks-item" target="_blank">
        <span class="icon-fb-icon-black"></span>
        <span>Facebook</span>
      </a>
      <a href="https://www.youtube.com/channel/UCmVdgNHsyFS8U4s7ayopYPQ/videos" class="socialLinks-item" target="_blank">
        <span class="icon-yt-icon-black"></span>
        <span>YouTube</span>
      </a>
      <a href="https://t.me/joinchat/AAAAAEozIp5hpHKW7-umCA" class="socialLinks-item" target="_blank">
        <span class="icon-teleg-icon-black"></span>
        <span>Telegram</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks',
};
</script>

<style scoped lang="scss">
.socialLinks-before-close .socialLinks-before {
  display: none;
}
.socialLinks {
  .socialLinks-items {
    display: flex;
  }
  &-item {
    display: flex;
    flex-direction: column;
    margin-right: 32px;
    color: $black;
    text-decoration: none;
    transition: all 0.3s;

    & span:last-child {
      margin-top: 8px;
      font-size: 13px;
    }
    span {
      font-size: 24px;
    }
    &:hover {
      color: $main;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

@media (max-width: 480px) {
  .header-info-left-user {
    .socialLinks {
      .socialLinks-item {
        & span:last-child {
          display: none;
        }
      }
    }
  }
}
</style>
