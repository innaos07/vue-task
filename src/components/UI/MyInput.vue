<template>
    <input type='text' :value='modelValue' @input='updateInput'>
</template>

<script>
    export default {
        name: 'my-input',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }

    }
</script>

<style scoped>
    input {
    width: 100%;
    border: 1px solid green;
    padding: 10px;
    margin-bottom: 20px;
}
</style>