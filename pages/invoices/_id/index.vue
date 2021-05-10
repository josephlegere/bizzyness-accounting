<template>
    <v-container>
        <div v-if="loading">
            <v-skeleton-loader
                type="article"
            ></v-skeleton-loader>

            <v-divider class="my-7"></v-divider>

            <v-skeleton-loader
                elevation="1"
                type="article, article, actions"
            ></v-skeleton-loader>
        </div>
        <div v-else>
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
                                <div><b>Due On:</b> {{ invoice.dateDue | moment("MMMM Do, YYYY") }}</div>
                            </v-col>
                        </v-row>

                        <v-divider class="my-5"></v-divider>
                    </v-card>
                </v-col>

                <v-col cols="12" class="my-4">
                    <v-card>
                        <RecordPayment @clicked="addPayment" />

                        <v-card-title>Payments</v-card-title>

                        <v-card-text>
                            <div class="mx-8 mb-2">
                                <div class="mb-1">
                                    <strong>Amount Due:</strong> {{amountdue}}
                                </div>

                                <div>
                                    <strong>Status:</strong> {{ status_detailed }}
                                </div>
                            </div>
                        </v-card-text>

                        <div v-if="invoice.payments.length > 0">
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
                                        v-for="(payment, i) in invoice.payments"
                                        :key="i"
                                    >
                                        <div>
                                            <div class="font-weight-normal">
                                                <strong>{{ payment.date.toDate() | moment("MMMM Do, YYYY") }} - A payment for {{ payment.amount }} ‎was made using {{ payment.method }}.</strong>
                                            </div>
                                            <div v-if="i===0">Down Payment</div>
                                        </div>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" class="my-4">
                    <v-card dark>
                        <InvoiceView :invoice="invoice" />
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters v-else>
                <v-col>
                    <v-card flat class="pa-4">
                        <v-card-title>Document Error</v-card-title>
                        <v-card-subtitle>{{ errors }}</v-card-subtitle>
                        <v-divider class="my-5"></v-divider>
                        <v-card-actions>
                            <v-btn outlined rounded @click="goToInvoices">Go Back to Invoices</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import InvoiceView from '~/components/InvoiceView';
import RecordPayment from '~/components/RecordPayment';
import { mapState } from 'vuex';

export default {
    data () {
        return {
            loading: false,
            errors: '',
            newPayment: null
        }
    },
    methods: {
        goToInvoices () {
            this.$router.push({ path: `/invoices` });
        },
        addPayment (payment) {
            console.log(payment);
            this.$store.dispatch('invoices/payment_add', { invoice: this.invoice.id, payment })
                .catch(err => {
                    this.errors = err;
                });
        }
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
            if (parseFloat(this.amountdue) == parseFloat(this.invoice.total)) return 'Pending';
            if (parseFloat(this.invoice.total) > parseFloat(this.amountdue) && parseFloat(this.amountdue) > 0) return 'Partial';
            return 'Paid';
        },
        status_detailed() {
            if (parseFloat(this.amountdue) == parseFloat(this.invoice.total)) return 'Payment for your invoice is pending.';
            if (parseFloat(this.invoice.total) > parseFloat(this.amountdue) && parseFloat(this.amountdue) > 0) return 'Your invoice is partially paid.';
            return 'Your invoice is fully paid';
        }
    },
    created() {
        if (this.invoice === null) {
            this.loading = true;
            this.$store.dispatch('invoices/details', { code: this.$route.params.id, tenant: this.tenant })
                .catch(err => {
                    this.errors = err;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
        else {
            this.loading = true;
            this.$store.dispatch('invoices/payments', this.invoice.id)
                .catch(err => {
                    this.errors = err;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    components: {
        InvoiceView,
        RecordPayment
    }
}
</script>

<style scoped>
</style>