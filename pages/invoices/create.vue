<template>
    <v-row no-gutters>
        <v-col class="text-center">

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
                <v-textarea
                    placeholder="Date"
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

                <draggable-nested class="drag-list mt-md-3" :headers="headers" :items="list" />
            </v-container>

            <br>

            <v-sheet
                dark
                class="form-toolbar">
                <v-toolbar
                    flat
                    height="50">
                    <v-toolbar-title class="mr-4">Total: {{total.toFixed(2)}}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-printer-search</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-send-circle-outline</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import DraggableNested from '../../components/DraggableNested';


export default {
    data () {
        return {
            bottomNav: 'recent',
            name: 'invoice-create',
            headers: [
                {value: 'key', text: 'Key'},
                {value: 'description', text: 'Description'},
                {value: 'quantity', text: 'Quantity'},
                {value: 'price', text: 'Price'},
                {value: 'total', text: 'Total'}
            ],
            list: [],
            total: 0.00
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
        },
        presets() {
            this.list = [
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
    created() {
        this.presets();
    },
    components: {
        DraggableNested
    }
}
</script>

<style scoped>
    .form-toolbar {
        position:               fixed;
        z-index:                4;
        bottom:                 35px;
        right:                  0;
    }
</style>