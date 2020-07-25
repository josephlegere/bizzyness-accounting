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
                    v-for="(item, key, i) in fillAccounts"
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
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
    data () {
        return {
            tab: null,
            items: {
                assets: {
                    title: 'Assets',
                    accounts: {
                        'Cash and Bank': {},
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
                        'Credit Card': {},
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
                        'Operating Expense': {},
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
            }
        }
    },
    methods: {
        fillAccounts() {
            console.log(this.accounts)
            Object.entries(this.accounts).forEach(elem => {
                let _key = elem[0];
                let { account_category, account_type, currency, currency_detail, description, name, set_date } = elem[1];

                this.items[account_category].accounts[account_type][_key] = {
                    currency,
                    currency_detail,
                    description,
                    name,
                    set_date
                }
            });
            console.log(this.items)
        }
    },
    computed: {
        ...mapState({
            accounts: state => state.accounts.list,
            loggeduser: state => state.auth.loggeduser
        }),
        tenant() {
            return this.loggeduser.tenantid.split('/')[1];
        },
        fillAccounts: {
            get () {
                //console.log(this.accounts)
                let _accounts = _.cloneDeep(this.items);
                Object.entries(this.accounts).forEach(elem => {
                    let _key = elem[0];
                    let { account_category, account_type, currency, currency_detail, description, name, set_date } = elem[1];

                    _accounts[account_category].accounts[account_type][_key] = {
                        currency,
                        currency_detail,
                        description,
                        name,
                        set_date
                    }
                });

                return _accounts;
            },
            set (_accounts) {
                return _accounts;
            }
            //console.log(this.items)
        }
    },
    async created() {
        await this.$store.dispatch('accounts/get', this.tenant);
        //this.fillAccounts();
    }
}
</script>

<style>

</style>