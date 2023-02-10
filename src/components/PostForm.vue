<template>
    <form @submit.prevent>
        <h2>Create post</h2>
        <my-input  
            v-focus
            v-model = "post.title"
            type="text" 
            placeholder="waiting new post" />
        <my-input 
            v-model = "post.body"
            placeholder="waiting new body" />
        <my-button @click="createPost">add</my-button>
    </form>
</template>

<script>

export default {
   
    data(){
        return {
            post: {
                title : '',
                body: '',
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Math.random().toString(36).substring(2,7);
            this.$emit('create', this.post, 'second params');
            this.post = {
                title : '',
                body: '',
            } 
        },

    },
    watch: {
            // post: {
            //     handler(newValue){
            //         console.log(newValue)
            //     },
            //     deep: true,
            // }
    }

}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;    
    }
    h2 {
        text-align: center;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 10px;
    }
    input {
        width: 100%;
        border: 1px solid green;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>