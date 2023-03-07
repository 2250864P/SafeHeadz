<template>
  <div id="app">
    <PageBackground>
      <router-view></router-view>
    </PageBackground>
  </div>
</template>

<style>
body {
  background-color: #9ac49a !important;
}
</style>


<script>
import PageBackground from '@/components/PageBackground.vue';
//import Footer from '@/components/Footer.vue';
// imported background and footer

export default {
  name: 'App',
  components: {
    PageBackground,
    //Footer,
  },

  created() {
    // background color to the body element
    document.body.style.backgroundColor = '#7fa17f'
  }
};
</script>


