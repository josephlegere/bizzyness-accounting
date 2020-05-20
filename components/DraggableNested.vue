<template>
    <draggable class="dragArea" tag="ul" :list="items" :group="{ name: 'g1' }" handle=".handle">
        <li v-for="el in items" :key="el.name">
            <v-card
                dense
                class="mb-1"
            >
                <v-row no-gutters>
                    <v-col
                        cols="1"
                    >
                        <v-icon class="handle">mdi-drag-horizontal</v-icon>
                    </v-col>
                    <v-col
                        cols="10"
                        md="2"
                    >
                        <v-textarea
                            class="design-textarea"
                            placeholder="Key"
                            v-model="el.key"
                            autoGrow
                            dense
                            hide-details
                            rows="1"
                        ></v-textarea>
                    </v-col>
                    <v-col
                        cols="10"
                        offset="1"
                        md="2"
                        offset-md="0"
                    >
                        <v-textarea
                            class="design-textarea"
                            placeholder="Description"
                            v-model="el.description"
                            autoGrow
                            dense
                            hide-details
                            rows="1"
                        ></v-textarea>
                    </v-col>
                    <v-col
                        cols="10"
                        offset="1"
                        md="2"
                        offset-md="0"
                    >
                        <v-textarea
                            class="design-textarea"
                            placeholder="Quantity"
                            v-model="el.quantity"
                            autoGrow
                            dense
                            hide-details
                            rows="1"
                        ></v-textarea>
                    </v-col>
                    <v-col
                        cols="10"
                        offset="1"
                        md="2"
                        offset-md="0"
                    >
                        <v-textarea
                            class="design-textarea"
                            placeholder="Price"
                            v-model="el.price"
                            autoGrow
                            dense
                            hide-details
                            rows="1"
                        ></v-textarea>
                    </v-col>
                    <v-col
                        cols="10"
                        offset="1"
                        md="2"
                        offset-md="0"
                    >
                        <v-textarea
                            class="design-textarea"
                            placeholder="Total"
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
                            <v-icon class="handle">mdi-close</v-icon>
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
    props: {
        items: {
            required: true,
            type: Array
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