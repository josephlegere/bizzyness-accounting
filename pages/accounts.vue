<template>
    <v-row no-gutters="">
        <v-col>
            <v-tabs
                v-model="tab"
                fixed-tabs
                center-active
                class="mt-4"
            >
                <v-tab
                    v-for="(category, i) in account_category"
                    :key="i"
                >
                    {{ category.title }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="(category, key, i) in fillAccounts"
                    :key="i"
                >
                    <v-simple-table
                        v-for="(account, key2, j) in category.accounts"
                        :key="j"
                    >
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left" colspan="3">{{ key2 }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, key3) in account" :key="key3">
                                    <td>{{ record.name }}</td>
                                    <td>{{ record.currency.code }}</td>
                                    <td>
                                        <v-btn icon @click="editAccount(record)">
                                            <v-icon>mdi-pencil-outline</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
            </v-tabs-items>

            <v-row
                class="toolbar-container"
                no-gutters
            >
                <v-col
                    md="2"
                    class="ml-md-auto"
                >
                    <v-sheet
                        color="transparent"
                        class="form-toolbar">
                        <v-toolbar
                            dark
                            height="60"
                            class="d-flex justify-center">

                            <v-btn
                                outlined
                                @click="addAccountModal = !addAccountModal"
                            >
                                Add Account
                            </v-btn>
                            
                            <v-bottom-sheet v-model="addAccountModal" scrollable transition="dialog-bottom-transition">
                                <v-card class="rounded-t-xl">
                                    <v-toolbar dark dense class="rounded-t-xl">
                                        <v-btn icon dark @click="addAccountModal = !addAccountModal">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>Add an Account</v-toolbar-title>
                                    </v-toolbar>

                                    <v-card-text class="my-md-16">
                                        <v-container>
                                            <v-form ref="form" v-model="validate">
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                    >
                                                        <v-autocomplete
                                                            v-model="formEntry.details"
                                                            :items="fillAccountTypes"
                                                            label="Account Type *"
                                                            item-text="account_type"
                                                            return-object
                                                            :rules="[v => !!v || 'Account Type is required']"
                                                            :disabled="editingAccount"
                                                        ></v-autocomplete>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                    >
                                                        <v-text-field
                                                            v-model="formEntry.name"
                                                            label="Account Name *"
                                                            :rules="[v => !!v || 'Account Name is required']"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                    >
                                                        <v-autocomplete
                                                            v-model="formEntry.currency"
                                                            :items="currency"
                                                            label="Currency"
                                                            item-text="name"
                                                            return-object
                                                            :rules="[v => !!v || 'Currency is required']"
                                                            :disabled="editingAccount"
                                                        ></v-autocomplete>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                    >
                                                        <v-textarea
                                                            v-model="formEntry.description"
                                                            label="Description"
                                                            autoGrow
                                                            dense
                                                            hide-details
                                                            rows="3"
                                                        ></v-textarea>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                        class="d-flex flex-row-reverse"
                                                    >
                                                        <span class="button-overlay-color ml-2">
                                                            <v-btn
                                                                dark
                                                                @click="submitAccount"
                                                                :loading="submittingForm"
                                                                :disabled="submittingForm"
                                                            >{{ editingAccount ? 'Edit' : 'Submit' }}</v-btn>
                                                        </span>
                                                        <span class="button-overlay-color">
                                                        <v-btn
                                                            v-if="editingAccount"
                                                            dark
                                                            @click="submitAccount"
                                                            :loading="submittingForm"
                                                            :disabled="submittingForm"
                                                        >Archieve</v-btn>
                                                        </span>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        offset-md="3"
                                                    >
                                                        <small>* indicates required field</small>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-bottom-sheet>

                        </v-toolbar>
                    </v-sheet>
                </v-col>
            </v-row>
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
            account_category: {
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
            },
            addAccountModal: false,
            formEntry: {
                details: null, // contains category and type
                name: null,
                currency: null,
                description: null
            },
            validate: false,
            submittingForm: false,
            editingAccount: false
        }
    },
    methods: {
        capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        submitAccount() {
            this.$refs.form.validate();

            if (this.validate) {
                this.submittingForm = true;

                if (!this.editingAccount) { //add an account
                    let { details, currency, name, description } = this.formEntry;
                    let { account_category, account_type } = details;
                    let formEntry = { account_category, account_type, currency, name, set_date: this.$fireModule.firestore.FieldValue.serverTimestamp() };
                    if (description) formEntry.description = description;

                    this.$store.dispatch('accounts/add', { newAccount: formEntry, tenant: this.tenant })
                    .then((ref) => {
                        this.$store.commit('accounts/insert', { [ref.id]: formEntry });
                        this.addAccountModal = false;
                    })
                    .catch(err => {
                        console.log(err);
                        console.error('Error in Store!');
                    })
                    .finally(() => {
                        this.validate = false;
                        this.submittingForm = false;
                    });
                }
                else { // updates an account
                    let { details, name, description } = this.formEntry;
                    let formEntry = { name };
                    if (description) formEntry.description = description;

                    this.$store.dispatch('accounts/edit', { tenant: this.tenant, account: details.key, updates: formEntry })
                    .then((ref) => {
                        this.$store.commit('accounts/update', { key: details.key, updates: formEntry });
                        this.addAccountModal = false;
                    })
                    .catch(err => {
                        console.log(err);
                        console.error('Error in Store!');
                    })
                    .finally(() => {
                        this.validate = false;
                        this.submittingForm = false;
                    });
                }
            }
        },
        editAccount(record) {
            console.log(record);
            let { key, account_type, currency, name, description } = record;
            this.editingAccount = true;
            this.addAccountModal = true;

            this.formEntry = {
                details: {
                    account_type,
                    key
                },
                name,
                currency,
                description
            };
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
                let _accounts = _.cloneDeep(this.account_category);
                Object.entries(this.accounts).forEach(elem => {
                    let _key = elem[0];
                    let { account_category, account_type, currency, description, name, set_date } = elem[1];

                    _accounts[account_category].accounts[account_type][_key] = {
                        key: _key,
                        account_type,
                        currency,
                        name,
                        set_date
                    }

                    if (description) _accounts[account_category].accounts[account_type][_key].description = description;
                });

                return _accounts;
            },
            set (_accounts) {
                return _accounts;
            }
            //console.log(this.account_category)
        },
        fillAccountTypes: function () {
            let _types = [];

            Object.entries(this.account_category).forEach((category, cat_key) => {
                _types.push({ header: this.capitalizeFirst(category[0]) });

                Object.keys(category[1].accounts).forEach(accounts => {
                    _types.push({ account_type: accounts, account_category: category[0] });
                });

                if (cat_key + 1 < Object.keys(this.account_category).length) _types.push({ divider: true });
            });

            return _types;
        },
        currency: function () {
            return this.rawCurrency.map(elem => {
                return {
                    code: elem.AlphabeticCode,
                    name: `${elem.AlphabeticCode} - ${elem.Currency}`
                }
            });
        }
    },
    watch: {
        addAccountModal (val) { // For resetting Add Account Form
            if (!val) this.editingAccount = false;
            !val && this.$refs.form.reset()
        }
    },
    async created() {
        await this.$store.dispatch('accounts/get', this.tenant);
    },
    async asyncData({ $axios }) {
        let rawCurrency = [];
        if (process.server) {
            rawCurrency = JSON.parse(require('fs').readFileSync('./static/data/currency.json', 'utf8'))
        } else {
            rawCurrency = await $axios.get('/data/currency.json').then(res => res.data)
        }
        return { rawCurrency };
    }
}
</script>

<style scoped>
    .toolbar-container {
        width:                  100%;
        position:               fixed;
        z-index:                4;
        bottom:                 35px;
        right:                  0;
    }
    .toolbar-container .col {
        width:                  100%;
    }
    .form-toolbar {
        width:                  100%;
    }
    .form-toolbar .v-toolbar {
        /* v-sheet default color is white, need to turn it transparent to remove for the border-radius apply its design */
        /* v-sheet need to contain the toolbar in order for the border radius to take effect */
        box-shadow:             0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -2px 5px 0px rgb(0 0 0 / 14%);
        border-radius:          15px 15px 0 0;
    }
    .button-overlay-color {
        background-color:       #272727;
        display:                inline-block;
        border-radius:          4px;
    }
</style>