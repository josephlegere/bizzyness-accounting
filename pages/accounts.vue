<template>
    <v-row no-gutters="">
        <v-col>
            <v-tabs
                v-model="tab"
                fixed-tabs
                background-color="indigo"
                dark
            >
                <v-tab
                    v-for="(item, i) in items"
                    :key="i"
                >
                    {{ item.title }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="(item, key, i) in items"
                    :key="i"
                >
                    <v-simple-table
                        v-for="(account, key2, j) in item.accounts"
                        :key="j"
                    >
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left" colspan="2">{{ key2 }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, key3) in account" :key="key3">
                                    <td>{{ record.name }}</td>
                                    <td>{{ record.currency }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
        return {
            tab: null,
            items: {
                assets: {
                    title: 'Assets',
                    accounts: {
                        'Cash and Bank': {
                            'Cash On Hand': {
                                name: 'Cash On Hand',
                                currency: 'PHP (Php) - Philippine Peso',
                                description: ''
                            },
                            'Joseph - Ahlibank Visa': {
                                name: 'Joseph - Ahlibank Visa',
                                currency: 'QAR (Qar) - Qatari Riyal',
                                description: ''
                            }
                        },
                        'Money in Transit': {},
                        'Expected Payments from Customers': {},
                        'Inventory': {},
                        'Property, Plant, Equipment': {},
                        'Depreciation and Amortization': {},
                        'Vendor Prepayments and Vendor Credits': {},
                        'Other Short-Term Asset': {},
                        'Other Long-Term Asset': {}
                    }
                },
                liabilities: {
                    title: 'Liabilities & Credit Cards',
                    accounts: {
                        'Credit Card': {
                            'Arman James - BDO Mastercard': {
                                name: 'Arman James - BDO Mastercard',
                                currency: 'PHP (Php) - Philippine Peso',
                                description: ''
                            }
                        },
                        'Loan and Line of Credit': {}
                    }
                },
                income: {
                    title: 'Income',
                    accounts: {
                        'Income': {},
                        'Discount': {}
                    }
                },
                expenses: {
                    title: 'Expenses',
                    accounts: {
                        'Operating Expense': {
                            'Accounting Fees': {
                                name: 'Accounting Fees',
                                currency: 'PHP (Php) - Philippine Peso',
                                description: ''
                            }
                        },
                        'Cost of Goods Sold': {}
                    }
                },
                equity: {
                    title:'Equity',
                    accounts: {
                        'Business Owner Contribution and Drawing': {},
                        'Cost of Goods Sold': {}
                    }
                }
            },
            // user_accounts: {
            //     'assets': {
            //         'Cash and Bank': {
            //             'accountid1': {
            //                 name: 'Cash On Hand',
            //                 currency: 'PHP (Php) - Philippine Peso',
            //                 description: ''
            //             },
            //             'Joseph - Ahlibank Visa': {}
            //         }
            //         accounts: [
            //             {
            //                 category: 'Cash and Bank',
            //                 records: [
            //                     {
            //                         name: 'Cash On Hand',
            //                         currency: 'PHP (Php) - Philippine Peso',
            //                         description: ''
            //                     },
            //                     {
            //                         name: 'Joseph - Ahlibank Visa',
            //                         currency: 'QAR (Qar) - Qatari Riyal',
            //                         description: ''
            //                     }
            //                 ]
            //             },
            //             {
            //                 category: 'Money in Transit',
            //                 records: []
            //             },
            //             {
            //                 category: 'Expected Payments from Customers',
            //                 records: []
            //             },
            //             {
            //                 category: 'Inventory',
            //                 records: []
            //             },
            //             {
            //                 category: 'Property, Plant, Equipment',
            //                 records: []
            //             },
            //             {
            //                 category: 'Depreciation and Amortization',
            //                 records: []
            //             },
            //             {
            //                 category: 'Vendor Prepayments and Vendor Credits',
            //                 records: []
            //             },
            //             {
            //                 category: 'Other Short-Term Asset',
            //                 records: []
            //             },
            //             {
            //                 category: 'Other Long-Term Asset',
            //                 records: []
            //             }
            //         ]
            //     },
            //     {
            //         title: 'Liabilities & Credit Cards',
            //         accounts: [
            //             {
            //                 category: 'Credit Card',
            //                 records: [
            //                     {
            //                         name: 'Arman James - BDO Mastercard',
            //                         currency: 'PHP (Php) - Philippine Peso',
            //                         description: ''
            //                     }
            //                 ]
            //             },
            //             {
            //                 category: 'Loan and Line of Credit',
            //                 records: []
            //             }
            //         ]
            //     },
            //     {
            //         title: 'Income',
            //         accounts: [
            //             {
            //                 category: 'Income',
            //                 records: []
            //             },
            //             {
            //                 category: 'Discount',
            //                 records: []
            //             }
            //         ]
            //     },
            //     {
            //         title: 'Expenses',
            //         accounts: [
            //             {
            //                 category: 'Operating Expense',
            //                 records: [
            //                     {
            //                         name: 'Accounting Fees',
            //                         currency: 'PHP (Php) - Philippine Peso',
            //                         description: ''
            //                     }
            //                 ]
            //             },
            //             {
            //                 category: 'Cost of Goods Sold',
            //                 records: []
            //             }
            //         ]
            //     },
            //     {
            //         title:'Equity',
            //         accounts: [
            //             {
            //                 category: 'Business Owner Contribution and Drawing',
            //                 records: []
            //             },
            //             {
            //                 category: 'Cost of Goods Sold',
            //                 records: []
            //             }
            //         ]
            //     }
            // }
        }
    }
}
</script>

<style>

</style>