<template>
    <div>
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

        <v-row>
            <draggable-nested v-model="elements" />
        </v-row>
    
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
    </div>
</template>

<script>
import DraggableNested from '../../components/DraggableNested';

export default {
    data () {
        return {
            bottomNav: 'recent',
            name: 'invoice-create'
        }
    },
    components: {
        DraggableNested
    },
    computed: {
        elements: {
            get() {
                return this.$store.state.invoiceCreate.elements;
            },
            set(value) {
                this.$store.dispatch('invoiceCreate/updateElements', value);
            }
        }
    }
}
</script>

<style>

</style>