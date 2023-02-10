<template>

    <div class="post">
        <div>
            <div><span style="font-weight: bold;">id: </span>{{post.id}}</div>
           <div><span style="font-weight: bold;">title: </span> {{ post.title}}</div>
           <div><span style="font-weight: bold;">body: </span>{{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button
                @click="$router.push(`/posts/${post.id}`)">
                open
            </my-button>
            <my-button
                style="margin-left: 20px;" 
                @click="$emit('remove', post)">
                delete
            </my-button>
            
        </div>
    </div>
</template>

<script>
 
    export default {

        props: {
            post: {
                type: Object,
                required: true,
            }
       }

    }
</script>

<style scoped>
    .post {
        display: flex;
        justify-content: space-between;
        border:  2px solid green;
        padding: 20px;
        margin-bottom: 20px;
    }
    .post__btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;
    }
</style>