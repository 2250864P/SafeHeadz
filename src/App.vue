<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <PageBackground>
      <div class="flex-grow-1">
        <router-view></router-view>
      </div>
    </PageBackground>
    <Footer />
  </div>
</template>

<style>
body {
  background-color: #9ac49a !important;
}
</style>

<script>
import PageBackground from '@/components/PageBackground.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    PageBackground,
    Footer,
  },

  created() {
    // background color to the body element
    document.body.style.backgroundColor = '#7fa17f'
  },
};
</script>



