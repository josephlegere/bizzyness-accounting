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
                            <th class="d-none d-sm-block align-center">{{total}}</th> 
                            <th colspan="2" class="pa-0"></th>
                        </tr>
                    </template>
                    <template v-slot:item="props">
                        <tr :active="props.selected" @click="open(props.item.id)">
                            <td>{{ props.item.invoice }}</td>
                            <td>{{ props.item.date }}</td>
                            <td>{{ props.item.client }}</td>
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
                suggests: ['2020-05-24', '2020-05-29'],
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
                ]
            }
        },
        methods: {
            updateDateFilter(range) {
                this.datefilter = range;
            },
            open(id) {
                this.$router.push({ path: `/invoices/${id}` });
            }
        },
        computed: {
            total: function() {
                return this.invoices.reduce(function(a, c){return a + Number((c.total) || 0)}, 0);
            },
            ...mapState({
                invoices: state => state.invoices.list
            })
        },
        async asyncData({store}) {
            await store.dispatch('invoices/get');
        },
        components: {
            DateRange
        }
    }
</script>

<style>

</style>