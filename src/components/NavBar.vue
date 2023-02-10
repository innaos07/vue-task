<template>
    <div class="navbar">
        <div @click="$router.push('/')">Lala</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button @click="$router.push('/about')">About</my-button>
            <my-button @click="$router.push('/store')">store</my-button>
            <my-button @click="$router.push('/composite')">composite</my-button>
        </div>
    </div>
   
</template>

<script>
    export default {
       

    }
</script>

<style scoped>
    .navbar {
        display: flex;
        align-items: center;
        padding:  20px;
        height: 80px;
        background-color:  #e5e5e5;
    }
    .navbar__btns {
        margin-left: auto;
    }
</style>