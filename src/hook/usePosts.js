import {ref, onMounted} from 'vue';
import axios from 'axios';


export default function usePosts(limit) {

    const posts = ref([]);
    const totalPage = ref(0);
    const isPostLoading = ref(true);

    const fetching = async ()=> {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit,
                }
            })
            console.log(response)
            totalPage.value = Math.ceil(response.headers['x-total-count']/limit);

            posts.value = response.data;
        } catch(e) {
            alert(e, 'error')
        } finally {
            isPostLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts,
        totalPage,
        isPostLoading
    }

       
}