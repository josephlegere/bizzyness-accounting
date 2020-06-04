<template>
    <v-row no-gutters="">
        <v-col>
            <v-card dark>
                <InvoiceView :invoice="invoice" />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import InvoiceView from '~/components/InvoiceView';
import { mapState } from 'vuex';

export default {
    methods: {
        
    },
    computed: {
        ...mapState({
            invoice: state => state.invoices.invoice
        })
    },
    components: {
        InvoiceView
    }
}
</script>

<style scoped>
</style>