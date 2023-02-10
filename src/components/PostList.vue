<template>
    <div  v-if="posts.length > 0">
        <h2 class="title">Список постов:</h2>
        <transition-group name="list">
        <post-item 
            class="post" 
            v-for="post in posts"
            :post="post" 
            :key="post.id"
            @remove="$emit('remove', post)"/>
        </transition-group>
    </div>
    <h2 v-else>
        todo list is empty...
    </h2>
    
</template>

<script>
    import PostItem from './PostItem.vue';

    export default {
        components: {
            PostItem
        },
        props: {
            posts: {
                type: Array,
                required: true,
            }
        }

    }
</script>

<style scoped>
    .title {
        margin-bottom: 20px;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
      transition: all 0.4s ease;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(130px);
    }
    .list-move {
    transition: transform 0.8s ease;
    }

</style>