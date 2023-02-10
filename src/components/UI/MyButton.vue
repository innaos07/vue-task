<template>
    <button>
        <slot></slot>
    </button>
   
</template>

<script>
    export default {
        name: 'my-button'

    }
</script>

<style scoped>
  button {
    padding: 10px 30px;
    border: 1px solid green;
    background-color: #fff;
    margin-bottom: 20px;
    text-align: center;
}
</style>