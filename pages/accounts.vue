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
                    v-for="(item, i) in items"
                    :key="i"
                >
                    <v-simple-table
                        v-for="(account, i) in item.accounts"
                        :key="i"
                    >
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left" colspan="2">{{ account.category }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, i) in account.records" :key="i">
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
                    accounts: [
                        {
                            category: 'Cash and Bank',
                            records: [
                                {
                                    name: 'Cash On Hand',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                },
                                {
                                    name: 'Joseph - Ahlibank Visa',
                                    currency: 'QAR (Qar) - Qatari Riyal',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Money in Transit',
                            records: []
                        },
                        {
                            category: 'Expected Payments from Customers',
                            records: []
                        },
                        {
                            category: 'Inventory',
                            records: []
                        },
                        {
                            category: 'Property, Plant, Equipment',
                            records: []
                        },
                        {
                            category: 'Depreciation and Amortization',
                            records: []
                        },
                        {
                            category: 'Vendor Prepayments and Vendor Credits',
                            records: []
                        },
                        {
                            category: 'Other Short-Term Asset',
                            records: []
                        },
                        {
                            category: 'Other Long-Term Asset',
                            records: []
                        }
                    ]
                },
                liabilities: {
                    title: 'Liabilities & Credit Cards',
                    accounts: [
                        {
                            category: 'Credit Card',
                            records: [
                                {
                                    name: 'Arman James - BDO Mastercard',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Loan and Line of Credit',
                            records: []
                        }
                    ]
                },
                income: {
                    title: 'Income',
                    accounts: [
                        {
                            category: 'Income',
                            records: []
                        },
                        {
                            category: 'Discount',
                            records: []
                        }
                    ]
                },
                expenses: {
                    title: 'Expenses',
                    accounts: [
                        {
                            category: 'Operating Expense',
                            records: [
                                {
                                    name: 'Accounting Fees',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Cost of Goods Sold',
                            records: []
                        }
                    ]
                },
                equity: {
                    title:'Equity',
                    accounts: [
                        {
                            category: 'Business Owner Contribution and Drawing',
                            records: []
                        },
                        {
                            category: 'Cost of Goods Sold',
                            records: []
                        }
                    ]
                }
            },
            user_accounts: [
                {
                    title: 'Assets',
                    accounts: [
                        {
                            category: 'Cash and Bank',
                            records: [
                                {
                                    name: 'Cash On Hand',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                },
                                {
                                    name: 'Joseph - Ahlibank Visa',
                                    currency: 'QAR (Qar) - Qatari Riyal',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Money in Transit',
                            records: []
                        },
                        {
                            category: 'Expected Payments from Customers',
                            records: []
                        },
                        {
                            category: 'Inventory',
                            records: []
                        },
                        {
                            category: 'Property, Plant, Equipment',
                            records: []
                        },
                        {
                            category: 'Depreciation and Amortization',
                            records: []
                        },
                        {
                            category: 'Vendor Prepayments and Vendor Credits',
                            records: []
                        },
                        {
                            category: 'Other Short-Term Asset',
                            records: []
                        },
                        {
                            category: 'Other Long-Term Asset',
                            records: []
                        }
                    ]
                },
                {
                    title: 'Liabilities & Credit Cards',
                    accounts: [
                        {
                            category: 'Credit Card',
                            records: [
                                {
                                    name: 'Arman James - BDO Mastercard',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Loan and Line of Credit',
                            records: []
                        }
                    ]
                },
                {
                    title: 'Income',
                    accounts: [
                        {
                            category: 'Income',
                            records: []
                        },
                        {
                            category: 'Discount',
                            records: []
                        }
                    ]
                },
                {
                    title: 'Expenses',
                    accounts: [
                        {
                            category: 'Operating Expense',
                            records: [
                                {
                                    name: 'Accounting Fees',
                                    currency: 'PHP (Php) - Philippine Peso',
                                    description: ''
                                }
                            ]
                        },
                        {
                            category: 'Cost of Goods Sold',
                            records: []
                        }
                    ]
                },
                {
                    title:'Equity',
                    accounts: [
                        {
                            category: 'Business Owner Contribution and Drawing',
                            records: []
                        },
                        {
                            category: 'Cost of Goods Sold',
                            records: []
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style>

</style>