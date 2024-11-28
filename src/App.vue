<template>
    <the-navigation-vue></the-navigation-vue>
    <router-view></router-view>
</template>

<script>
import TheNavigationVue from './components/Navigator/TheNavigation.vue';
export default {
    name: 'App',
    components: {
        TheNavigationVue,
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
