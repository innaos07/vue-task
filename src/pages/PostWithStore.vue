<template>
    <div class="app">
        <h1>{{store.name}}</h1>
      <div>{{store.count}}</div>
      <button >add</button>
  </div>
</template>

<script>
    import {useCounterStore} from "../store/counter";
    import { mapWritableState } from 'pinia'



export default {
  setup() {
    const store = useCounterStore()
    
    store.increment()
    store.increment()
    store.increment()

    return {
         store  
    }
  },




}

</script>


<style >


</style>