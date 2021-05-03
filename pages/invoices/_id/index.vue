<template>
    <v-container>
        <v-row no-gutters="" v-if="Object.keys(this.invoice).length > 0">

            <v-col class="pt-2">
                <v-card flat>
                    <div class="text-h4" v-text="`Invoice #${invoice.invoice_code}`"></div>
                    <v-row no-gutters>
                        <v-col cols="12" md="6" class="d-flex flex-row">
                            <div class="mr-4"><b>Status:</b> {{status}}</div>
                            <div><b>Customer:</b> {{invoice.customer.account}}</div>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-md-end">
                            <div class="mr-4"><b>Amount Due:</b> {{amountdue}}</div>
                            <div><b>Due On:</b> {{ invoice.dateDue | moment("MMMM Do YYYY") }}</div>
                        </v-col>
                    </v-row>

                    <v-divider class="my-5"></v-divider>
                </v-card>
            </v-col>

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
            invoice: state => state.invoices.invoice,
            loggeduser: state => state.auth.loggeduser
        }),
        tenant() {
            return this.loggeduser.tenantid;
        },
        amountdue() {
            let total_paid = 0;
            this.invoice.payments.forEach(elem => {
                total_paid += parseFloat(elem.amount);
            });
            return (parseFloat(this.invoice.total) - parseFloat(total_paid)).toFixed(2);
        },
        status() {
            if (parseFloat(this.amountdue) == parseFloat(this.invoice.total)) return 'Unpaid';
            if (parseFloat(this.invoice.total) > parseFloat(this.amountdue) && parseFloat(this.amountdue) > 0) return 'Partial';
            return 'Paid';
        }
    },
    async created() {
        if (!(Object.keys(this.invoice).length > 0)) {
            this.$store.dispatch('invoices/details', { code: this.$route.params.id, tenant: this.tenant });
        }
        console.log(!(Object.keys(this.invoice).length > 0));
        console.log(this.invoice);
    },
    components: {
        InvoiceView
    }
}
</script>

<style scoped>
</style>