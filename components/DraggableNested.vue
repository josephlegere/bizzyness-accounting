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
                        v-for="(data, i) in headers"
                        :key="i"
                        cols="10"
                        md="2"
                        :offset="i > 0 ? 1 : null"
                        :offset-md="i > 0 ? 0 : null"
                    ><!-- offsets will be null if its the first element -->
                        <v-textarea
                            class="design-textarea"
                            :placeholder="data.text"
                            v-model="el[data.value]"
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
                
            <draggable-nested :headers="headers" :items="el.items" />
        </li>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'draggable-nested',
    props: {
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
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