<script>
import { RouterView } from 'vue-router';
import ComponentFooter from './components/ComponentFooter.vue';
import ComponentNavbar from './components/ComponentNavbar.vue';

export default {
  name: 'App',
  components: {
    ComponentNavbar,
    RouterView,
    ComponentFooter
  },
}
</script>


<template>
  <div>
    <header>
      <ComponentNavbar />
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <ComponentFooter />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/partials/variables' as *;

  

</style>
