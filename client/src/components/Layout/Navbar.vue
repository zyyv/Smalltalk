<template>
  <div class="z-nav z-navbar">
    <router-link class="logo"
                 to="/">
      <img src="../../assets/logo.png"
           alt="">
    </router-link>
    <div class="actions">
      <div class="menus">
        <router-link v-for="(menu, i) in menus"
                     :key="menu.path"
                     :to="menu.path"
                     custom
                     exact
                     v-slot="{navigate, isExactActive}">
          <div class="item"
               @click="navigate"
               v-html="menu.icon"
               :class="[isExactActive && 'active',i === menus.length - 1 && 'setting']">
          </div>
        </router-link>
        <router-link to="/profile"
                     custom
                     v-slot="{navigate, isActive}">
          <div class="item"
               :class="[isActive && 'active']"
               @click="navigate">
            <Avatar class="avatar"
                    :online="isActive"
                    :src="userInfo.avatar" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "/@c/Avatar.vue"
import { ref, reactive } from "vue"
import menus from "./menus"
import { useStore } from "vuex"
export default {
  name: "Navbar",
  components: { Avatar },
  setup () {
    const store = useStore()
    return { menus, userInfo: store.state.user.userInfo }
  }
}
</script>
<style lang='scss' scoped>
.z-nav {
  order: 1;
  &.z-navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 6rem;
  }
  .logo {
    display: none;
  }
  .actions {
    display: flex;
    .menus {
      .item {
        transition: color 0.3s;
        color: #aab0b7;
        &.active {
          color: #0176ff;
        }
        &.setting {
          display: none;
        }
        &:hover {
          cursor: pointer;
          color: #0176ff;
        }
      }
    }
  }
}
@media (min-width: 769px) {
  .z-nav {
    height: 100vh;
    &.z-navbar {
      width: 9rem;
      overflow-y: auto;
      overflow-x: hidden;
      padding-left: 0;
      padding-right: 0;
      text-align: center;
      order: 0;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .logo {
      display: block;
      width: 4.6rem;
      height: 4.6rem;
      font-size: 0;
      margin-bottom: 1.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .actions {
      flex: 1;
      font-size: 22px;
      flex-direction: column;
      justify-content: space-between;
      > .menus {
        position: relative;
        height: 100%;
        .item {
          margin-top: 2.5rem;
          color: #aab0b7;
          &.setting {
            display: block;
          }
          &:hover {
            cursor: pointer;
            color: #0176ff;
          }
          &:nth-of-type(5),
          &:nth-of-type(6) {
            position: absolute;
          }
          &:nth-of-type(5) {
            bottom: calc(4.4rem + 2.5rem);
          }
          &:nth-of-type(6) {
            bottom: 0;
            left: -50%;
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .z-nav {
    order: 1;
    .actions {
      width: 100%;
      height: 100%;
      flex-direction: row;
      .menus {
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 5rem;
          height: 100%;
          font-size: 2rem;
          .avatar {
            width: 4rem !important;
            height: 4rem !important;
          }
        }
      }
    }
  }
}
</style>
