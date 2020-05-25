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
                            <date-range :dates="datefilter" />
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
                            <th class="d-none d-sm-block align-center">{{total}}</th> 
                            <th colspan="2" class="pa-0"></th>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import DateRange from '~/components/DateRange';

    export default {
        computed: {
            total: function() {
                return this.invoices.reduce(function(a, c){return a + Number((c.total) || 0)}, 0);
            }
        },
        data () {
            return {
                datefilter: [],
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
                    { text: 'Remarks', value: 'remarks' },
                ],
                invoices: [
                    {
                        invoice: 'Frozen Yogurt',
                        date: 159,
                        client: 6.0,
                        total: 24,
                        author: 4.0,
                        remarks: '1%',
                    },
                    {
                        invoice: 'Ice cream sandwich',
                        date: 237,
                        client: 9.0,
                        total: 37,
                        author: 4.3,
                        remarks: '1%',
                    },
                    {
                        invoice: 'Eclair',
                        date: 262,
                        client: 16.0,
                        total: 23,
                        author: 6.0,
                        remarks: '7%',
                    },
                    {
                        invoice: 'Cupcake',
                        date: 305,
                        client: 3.7,
                        total: 67,
                        author: 4.3,
                        remarks: '8%',
                    },
                    {
                        invoice: 'Gingerbread',
                        date: 356,
                        client: 16.0,
                        total: 49,
                        author: 3.9,
                        remarks: '16%',
                    },
                    {
                        invoice: 'Jelly bean',
                        date: 375,
                        client: 0.0,
                        total: 94,
                        author: 0.0,
                        remarks: '0%',
                    },
                    {
                        invoice: 'Lollipop',
                        date: 392,
                        client: 0.2,
                        total: 98,
                        author: 0,
                        remarks: '2%',
                    },
                    {
                        invoice: 'Honeycomb',
                        date: 408,
                        client: 3.2,
                        total: 87,
                        author: 6.5,
                        remarks: '45%',
                    },
                    {
                        invoice: 'Donut',
                        date: 452,
                        client: 25.0,
                        total: 51,
                        author: 4.9,
                        remarks: '22%',
                    },
                    {
                        invoice: 'KitKat',
                        date: 518,
                        client: 26.0,
                        total: 65,
                        author: 7,
                        remarks: '6%',
                    },
                ]
            }
        },
        components: {
            DateRange
        }
    }
</script>

<style>

</style>