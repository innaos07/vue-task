<template>
    <div class="app">
        <h1 style="text-align: center; margin-bottom: 10px;">Страница с постами</h1>
        <my-input 
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog">
                create post
            </my-button>
            <my-select
                v-model="selectedSort" 
                :options="sortOptions"
            />
        </div>
        <my-dialog 
            v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
       
        <post-list 
            :posts="sortedAndSearchPosts"
            @remove="removePost"
            v-if="!isPostLoading"
       />
       <div v-else>Loading...</div>
       <div ref="observer" class="observer"></div>
  </div>
</template>

<script>

import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';
import usePosts from '../hook/usePosts';
import useSortedPosts from '../hook/useSortedPosts';
import useSortedWithSearch from '../hook/useSortedWithSearch';
import axios from 'axios'; 
import {ref} from 'vue';


export default {
    components: {
        PostList, 
        PostForm,
    },
    data() {
      return {
        dialogVisible: false,
        page: 1,
        limit: 10,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ]
      }
    },
    methods: {
        createPost(post, second) {
            this.posts.push(post);
            this.dialogVisible = false;

        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async loadMostPost() {
            try {
                this.page += 1;
               
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                })
                console.log(response)
                this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch(e) {
                alert(e, 'error')
            } 
        },
    },
    mounted() {           
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            
            if(entries[0].isIntersecting && this.page < this.totalPage) {
            console.log('lalala is load',entries)
            this.loadMostPost()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    setup(props) {
  
       const { posts, totalPage, isPostLoading } = usePosts(10);
       const { selectedSort,sortedPosts } = useSortedPosts(posts);
       const { searchQuery, sortedAndSearchPosts } = useSortedWithSearch(sortedPosts)
     
       return {
            posts, totalPage, isPostLoading,
            selectedSort,sortedPosts,
            searchQuery, sortedAndSearchPosts,
       }
    },
}
</script>

<style >

.app__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;  
}
.page__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.page {
    padding: 10px;
    border: 1px solid #e5e5e5;
}
.page--current {
    border: 2px solid green;
}
.observer {
    /*height:  1px;
    background-color: teal;*/
}
</style>