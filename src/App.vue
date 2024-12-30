<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import Main from "./views/layout/Main.vue";
export default {
  components: {
    Main,
  },
};
</script>
