<template>
    <draggable class="dragArea" tag="ul" :list="items" :group="{ name: 'g1' }" handle=".handle">
        <li v-for="(el, i) in itemConfig" :key="i">
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
                        cols="10"
                        md="2"
                    >
                        <v-select
                            :items="rowtypes"
                            v-model="el.rowtype"
                            placeholder="Types"
                            dense
                            hide-details
                            hide-selected
                            solo
                            flat
                            clearable
                            clear-icon="mdi-close-circle"
                        ></v-select>
                    </v-col>
                    <v-col
                        v-for="(data, i) in headers"
                        :key="i"
                        cols="10"
                        :md="data.colsize ? data.colsize : 1"
                        offset="1"
                        offset-md="0"
                    ><!-- offsets will be null if its the first element -->
                        <v-textarea
                            class="design-textarea"
                            :placeholder="data.text"
                            v-model="el[data.value]"
                            :readonly="data.readonly"
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
    data: () => ({
        rowtypes: [
            {
                text: 'MTR',
                value: 'materials'
            },
            {
                text: 'JOB',
                value: 'jobs'
            },
            {
                text: '\\n',
                value: 'new line'
            }
        ],
        definedRowTypes: [] //material and job will go here
    }),
    methods: {
        removeAt(i) {
            //console.log(`delete ${i}`)
            this.items.splice(i, 1);
        }
    },
    computed: {
        itemConfig: function () {
            return this.items.map(elem => {
                this.headers.forEach(heads => {
                    if (heads.hasOwnProperty('input')) {
                        if (heads.input.hasOwnProperty('compute')) { //for computations
                            let _items = heads.input.items.map(x => parseFloat(elem[x]));
                            let _value = _items.reduce(heads.input.compute);
                            elem[heads.value] = isNaN(_value) || parseInt(_value) === 0 ? '' : _value.toFixed(2);
                        }
                        else if (heads.input.hasOwnProperty('join')) { //for concatinating string
                            let _items = heads.input.items.map(x => elem[x]);
                            let _value = _items.reduce(heads.input.join);
                            elem[heads.value] = _value;
                        }
                        else {
                            console.error(`Add "Compute" or "Join" property in your input object for "${heads.value}"!`);
                        }
                        //console.log(elem)
                    }
                });
                return elem;
            });
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