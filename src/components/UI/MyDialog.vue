<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'my-dialog',
      props: {
        show: {
            type: Boolean,
            default: false,
        }
      },
      methods: {
        hideDialog() {
            console.log('show false')

            this.$emit('update:show', false)
        }
      }

    }
</script>

<style scoped>
    .dialog {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0, 0.5);
        z-index: 1;
        
    }
    .dialog__content {
        margin: auto;
        background-color: #fff;
        border-radius: 12px;
       
        min-width:  300px; 
        padding: 20px;
        padding-bottom: 0;
    }

</style>