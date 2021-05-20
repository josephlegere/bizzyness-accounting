<template>
    <div>
        <v-icon
            v-if="updateButton"
            small
            class="mr-2"
            @click="updateItem(item)"
        >
            mdi-pencil-outline
        </v-icon>
        <v-icon
            v-if="deleteButton"
            small
            @click="deleteItem(itemData)"
        >
            mdi-close
        </v-icon>
    </div>
</template>

<script>
export default {
    props: {
        itemData: {
            type: Object,
            required: true
        },
        updateButton: {
            type: Boolean
        },
        deleteButton: {
            type: Boolean
        }
    },
    data() {
        return {
        }
    },
    methods: {
        updateItem(item) {

        },
        deleteItem(item) {
            this.$emit('delete', item);
        }
    },
    computed: {
    },
    created() {
        console.log(this.deleteAction);
    }
}
</script>

<style>

</style>