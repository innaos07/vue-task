<template>
    <nav-bar></nav-bar>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'


export default {
    components: {
        NavBar,
    }
}

</script>


<style >
.app {
    padding:  0 20px;
    box-sizing: border-box;

}

</style>
