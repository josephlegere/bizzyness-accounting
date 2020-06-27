<template>
    <v-row no-gutters="">
        <v-col>
            <v-card>
                <v-card-title>
                    <v-row no-gutters>
                        <v-col cols="12"  md="6" class="pa-2">
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-2">
                            <date-range :suggests="suggests" @update-range="updateDateFilter" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="invoices"
                    :search="search"
                >
                    <template slot="body.append">
                        <tr>
                            <th class="d-flex justify-space-between align-center">TOTAL <span class="d-sm-none">{{total}}</span></th>
                            <th colspan="2" class="pa-0"></th>
                            <th class="d-none d-sm-block align-center">{{total.toFixed(2)}}</th> 
                            <th colspan="2" class="pa-0"></th>
                        </tr>
                    </template>
                    <template v-slot:item="props">
                        <tr :active="props.selected" @click="open(props.item)">
                            <td>{{ props.item.invoice_code }}</td>
                            <td>{{ props.item.date | moment("dddd, MMMM Do YYYY") }}</td>
                            <td>{{ props.item.client.account }}</td>
                            <td>{{ props.item.total }}</td>
                            <td>{{ props.item.author }}</td>
                            <td>{{ props.item.remarks }}</td>
                        </tr> 
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import DateRange from '~/components/DateRange';
    import { mapState } from 'vuex';

    export default {
        data () {
            return {
                datefilter: [],
                suggests: [],
                search: '',
                headers: [
                    {
                        text: 'Invoice No.',
                        align: 'start',
                        sortable: false,
                        value: 'invoice',
                    },
                    { text: 'Date', value: 'date' },
                    { text: 'Client', value: 'client' },
                    { text: 'Total', value: 'total' },
                    { text: 'Author', value: 'author' },
                    { text: 'Remarks', value: 'remarks' }
                ]
            }
        },
        methods: {
            updateDateFilter(range) {
                this.datefilter = range;
                this.filterData();
            },
            open(invoice) {
                //console.log(invoice)
                this.$store.commit('invoices/setInvoice', invoice);
                this.$router.push({ path: `/invoices/${invoice.invoice_code}` });
            },
            async filterData() {
                console.log('filter');
                await this.$store.dispatch('invoices/get', this.datefilter);
            }
        },
        computed: {
            total: function() {
                return this.invoices.reduce(function(a, c) { return a + Number((c.total) || 0) }, 0);
            },
            ...mapState({
                invoices: state => state.invoices.list
            })
        },
        async mounted() {
            //await this.$store.dispatch('invoices/get', this.datefilter);
        },
        // async asyncData({store}) {
        //     await store.dispatch('invoices/get', this.datefilter);
        // },
        components: {
            DateRange
        }
    }
</script>

<style>

</style>