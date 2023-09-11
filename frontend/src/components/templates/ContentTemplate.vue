<template>
  <div class="content" v-bind:class="{ isActiveContent: isMenuVisible && $route.name !== 'authpage' && $route.name !== 'validateaccountpage', 
    contentOut: $route.name === 'authpage' || $route.name === 'validateaccountpage'}">
      <RouterView v-slot="{Component}">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </RouterView>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContentTemplate',
  computed: mapState(['isMenuVisible']),
}
</script>

<style>
  h1 {
    color: var(--clr-primary);
  }

  .fade-enter-active {
    transition: 600ms ease all;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(60px);
  }
  
  .content {
    position: absolute;
    height: 100%;
    width: calc(100% - 78px);
    left: 78px;
    transition: all 0.5s ease;
  }

  .contentOut {
    display: flex;
    justify-content: center;
    text-align: left;
    width: 100%;
    left: 0;
  }

  .isActiveContent {
    width: calc(100% - 240px);
    left: 240px;
  }
</style>