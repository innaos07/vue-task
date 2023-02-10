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
      <!--   <my-button
            @click="fetchPosts"
        >
            get post
        </my-button> -->
        
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
       <!-- <div class="page__wrapper">
           <div 
                class="page" 
                :class="{
                    'page--current' : page === pageNumber
                }"
                v-for="pageNumber in totalPage"
                :key="pageNumber"
                @click="changePage(pageNumber)">
                {{pageNumber}}
            </div>
       </div> -->
  </div>
</template>

<script>

import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';
import axios from 'axios'; 

export default {
    components: {
        PostList, 
        PostForm,
    },

    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        page: 1,
        limit: 10,
        totalPage: 0,
        searchQuery: '',
        selectedSort: '',
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
            console.log('remove post', post)
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                })
                console.log(response)
                this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                console.log(this.totalPage)

                this.posts = response.data;
            } catch(e) {
                alert(e, 'error')
            } finally {
                this.isPostLoading = false;
            }

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
                console.log(this.totalPage)

                this.posts = [...this.posts, ...response.data];
            } catch(e) {
                alert(e, 'error')
            } 

        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },
       
    },
    mounted() {
            this.fetchPosts();
            console.log(this.$refs.observer)
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
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
            })
        },
        sortedAndSearchPosts() {
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    watch: {
        // selectedSort(newValue) {
        //     console.log(newValue)
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])

        //     } )
        //     console.log(this.posts)
        // },
        // dialogVisible(newValue) {
        //     console.log(newValue)
        // }
        // page() {
        //     this.fetchPosts();
        // }
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