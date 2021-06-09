<template>
  <div id="app" :class="{ 'ios-padding-top': APPSYS().s === 'IOS' }">

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
   
  },
};
</script>
<style lang="less">
#app {
  // iphone状态栏以及安全区域的适配
  padding-top: env(safe-area-inset-top);
  padding-top: constant(safe-area-inset-top);
}
</style>
