<template>
    <v-layout>
        <v-flex class="text-center">

            <p class="text-right">{{ new Date().getMonth() }} {{ new Date().getDate() }}, {{ new Date().getFullYear() }}</p>
            <h3>Invoice</h3>
            <h2>12345</h2>

            <v-container>
                <v-textarea
                    placeholder="Clients"
                    autoGrow
                    dense
                    hide-details
                    rows="1"
                ></v-textarea>
            </v-container>

            <v-container>
                <v-toolbar
                    class="mb-1"
                    height="30"
                    elevation="2"
                    collapse
                >
                    <v-btn icon @click="add">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>

                <draggable-nested class="drag-list mt-md-3" :items="list" />
            </v-container>

            <br>
        
            <v-bottom-navigation
                v-model="bottomNav"
                absolute
                height="40"
            >
                <v-btn value="recent">
                    <span>Recent</span>
                    <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn value="favorites">
                    <span>Favorites</span>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn value="nearby">
                    <span>Nearby</span>
                    <v-icon>mdi-map-marker</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-flex>
    </v-layout>
</template>

<script>
import DraggableNested from '../../components/DraggableNested';


export default {
    data () {
        return {
            bottomNav: 'recent',
            name: 'invoice-create',
            list: [
                {
                    key: '1',
                    description: 'abc',
                    quantity: '',
                    price: '',
                    items: []
                },
                {
                    key: '2',
                    description: '',
                    quantity: '',
                    price: '',
                    items: []
                },
                {
                    key: '3',
                    description: '',
                    quantity: '',
                    price: '',
                    items: []
                },
                {
                    key: '5',
                    description: '',
                    quantity: '',
                    price: '',
                    items: [
                        {
                            key: '4',
                            description: '',
                            quantity: '',
                            price: '',
                            items: []
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        add: function() {
            this.list.push({
                key: '',
                description: '',
                quantity: '',
                price: '',
                items: []
            });
        }
    },
    components: {
        DraggableNested
    }
}
</script>

<style scoped>
    .drag-list {
        /* width:                      400px; */
    }
</style>