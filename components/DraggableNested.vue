<template>
    <draggable class="dragArea" tag="ul" :list="items" :group="{ name: 'g1' }" handle=".handle">
        <li v-for="(el, i) in items" :key="i">
            <v-card
                dense
                class="mb-1"
            >
                <v-row no-gutters>
                    <v-col
                        cols="1"
                        class="d-flex justify-center"
                    >
                        <v-icon class="handle align-self-center">mdi-drag-horizontal</v-icon>
                    </v-col>
                    <v-col
                        v-for="(data, i) in recordData"
                        :key="i"
                        cols="10"
                        md="2"
                        :offset="data.offset ? data.offset : null"
                        :offset-md="data.hasOwnProperty('offset_md') ? data.offset_md : null"
                    >
                        <v-textarea
                            class="design-textarea"
                            :placeholder="data.placeholder"
                            v-model="el[data.cellData]"
                            autoGrow
                            dense
                            hide-details
                            rows="1"
                        ></v-textarea>
                    </v-col>
                    <v-col
                        cols="1"
                    >
                        <v-btn
                            icon
                        >
                            <client-only>
                                <v-icon class="handle" @click="removeAt(i)">mdi-close</v-icon>
                            </client-only>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
                
            <draggable-nested :items="el.items" />
        </li>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'draggable-nested',
    data () {
        return {
            recordData: [
                {cellData: 'key', placeholder: 'Key'},
                {cellData: 'description', placeholder: 'Description', offset: 1, offset_md: 0},
                {cellData: 'quantity', placeholder: 'Quantity', offset: 1, offset_md: 0},
                {cellData: 'price', placeholder: 'Price', offset: 1, offset_md: 0},
                {cellData: 'total', placeholder: 'Total', offset: 1, offset_md: 0}
            ]
        }
    },
    props: {
        items: {
            required: true,
            type: Array
        }
    },
    methods: {
        removeAt(i) {
            console.log(`delete ${i}`)
            this.items.splice(i, 1);
        }
    },
    components: {
        draggable
    }
}
</script>

<style>
    .drag-list {
        padding:                    0 !important;
    } 
    .dragArea {
        /* outline:                    1px dashed; */
    }
    .dragArea li {
        /* outline:                    1px solid; */
        list-style:                 none;
    }
    .design-textarea.v-text-field > .v-input__control > .v-input__slot:before {
        border-style:               none;
    }
    .design-textarea.v-text-field > .v-input__control > .v-input__slot:after {
        border-style:               none;
    }
</style>