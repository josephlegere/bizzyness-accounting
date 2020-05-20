<template>
    <v-layout>
        <v-flex class="text-center">
            <v-toolbar dense>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Create An Invoice</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container fluid>
                <draggable-nested class="drag-list mt-md-3" :items="list" />
            </v-container>
        
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