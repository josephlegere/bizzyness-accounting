<template>
    <v-container>
        <v-row no-gutters="">

            <v-col cols="12" class="my-4">
                <v-card>
                    <v-btn outlined rounded small absolute style="top: 22px; right: 22px">Add Payment</v-btn>
                    <v-card-title>Payments</v-card-title>

                    <v-card-text>
                        <div class="mx-8 mb-2">
                            <div class="mb-1">
                                <strong>Amount Due:</strong> Php 9,499.00
                            </div>

                            <div>
                                <strong>Status:</strong> Your invoice is partially paid
                            </div>
                        </div>
                    </v-card-text>

                    <v-divider class="mx-8"></v-divider>

                    <v-card-text>
                        <div class="font-weight-bold ml-8 mb-2">
                            Payments received:
                        </div>

                        <v-timeline
                            align-top
                            dense
                        >
                            <v-timeline-item
                                small
                                color="grey"
                            >
                                <div>
                                    <div class="font-weight-normal">
                                        <strong>January 1, 2021 - A payment for Php6,000.00 ‎was made using cash.</strong>
                                    </div>
                                    <div>Down Payment</div>
                                </div>
                            </v-timeline-item>
                            <v-timeline-item
                                small
                                color="grey"
                            >
                                <div>
                                    <div class="font-weight-normal">
                                        <strong>February 1, 2021 - A payment for Php4,750.00 ‎was made using cash.</strong>
                                    </div>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" class="my-4">
                <v-card dark>
                    <InvoiceView :invoice="invoice" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
    async created() {
        console.log(this.invoice);
    },
    components: {
        InvoiceView
    }
}
</script>

<style scoped>
</style>