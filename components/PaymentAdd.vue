<template>
    <v-dialog
        v-model="addPaymentDialog"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                outlined
                rounded
                small
                absolute
                @click.stop="addPaymentDialog = true"
                style="top: 22px; right: 22px"
                v-bind="attrs"
                v-on="on"
            >
                Add Payment
            </v-btn>
        </template>
        <v-card rounded="xl" class="pa-2">
            <v-card-title class="headline">
                Invoice Payment
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form ref="form" v-model="validate">
                        <v-row>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <v-menu
                                    ref="datepicker"
                                    v-model="datepicker"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateToDisplay"
                                            :error-messages="dateErrors"
                                            label="Date *"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            @change="$v.dateToDisplay.$touch()"
                                            @blur="$v.dateToDisplay.$touch()"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="datepicker = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.datepicker.save(date)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <v-text-field
                                    label="Amount *"
                                    v-model="amount"
                                    :error-messages="amountErrors"
                                    @input="$v.amount.$touch()"
                                    @blur="$v.amount.$touch()"
                                ></v-text-field>
                                    <!-- :rules="[v => !!v || 'Amount is required', v => v > 0 || 'Amount is required']" -->
                            </v-col>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <v-combobox
                                    v-model="method"
                                    :items="payment_methods"
                                    label="Payment Method *"
                                    :error-messages="methodErrors"
                                    @change="$v.method.$touch()"
                                    @blur="$v.method.$touch()"
                                ></v-combobox>
                            </v-col>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <v-combobox
                                    v-model="account"
                                    :items="fillAccounts"
                                    label="Account *"
                                    item-text="name"
                                    return-object
                                    :error-messages="accountErrors"
                                    @change="$v.account.$touch()"
                                    @blur="$v.account.$touch()"
                                ></v-combobox>
                            </v-col>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <v-textarea
                                    label="Notes"
                                    v-model="notes"
                                    autoGrow
                                    dense
                                    hide-details
                                    rows="3"
                                ></v-textarea>
                            </v-col>
                            <v-col
                                cols="12"
                                md="8"
                                offset-md="2"
                            >
                                <small>* indicates required field</small>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="#303030"
                    text
                    @click="addPaymentDialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="#663b0e"
                    dark
                    @click="submitPayment"
                >
                    Add Payment
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { required, minValue, numeric } from 'vuelidate/lib/validators';

export default {
    data () {
        return {
            addPaymentDialog: false,
            datepicker: false,
            date: moment().format('YYYY-MM-DD'),
            amount: '0.00',
            method: null,
            payment_methods: ['Bank Payment', 'Cash', 'Cheque', 'Credit Card', 'Other'],
            account: null,
            payment_accounts: [
                { item: 'Cash and Bank', value: 'Cash and Bank' },
                { item: 'Credit Card', value: 'Credit Card' },
            ],
            notes: '',
            validate: false
        }
    },
    validations: {
        dateToDisplay: {
            required
        },
        amount: {
            required,
            minValue: (value) => value > 0,
            numeric
        },
        method: {
            required
        },
        account: {
            required
        }
    },
    methods: {
        submitPayment() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let _payment = {
                    date: this.$fireModule.firestore.Timestamp.fromDate(new Date(this.date)),
                    amount: this.amount,
                    method: this.method,
                    account: this.account
                };

                if (this.notes !== '' && this.notes !== null && this.notes !== this.notes.replace(/\s/g, '')) _payment.notes = this.notes;

                this.$emit('clicked', _payment);
                this.addPaymentDialog = false;
            }
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
        dateToDisplay() {
            return moment(this.date).format('MMMM Do, YYYY');
        },
        fillAccounts() {
            let _accounts = [];
            this.payment_accounts.forEach(group => {
                let _temp = [];
                Object.entries(this.accounts).filter(elem => elem[1].account_type === group.item).forEach(elem => {
                    let { name, currency } = elem[1];
                    _temp.push({ name, currency, id: `tenant_accounts/${this.tenant}/accounts/${elem[0]}` });
                });
                if (_temp.length > 0) {
                    _accounts.push({ header: group.value });
                    _accounts = _accounts.concat(_temp);
                }
            });
            return _accounts;
        },
        dateErrors() {
            const errors = []
            if (!this.$v.dateToDisplay.$dirty) return errors
            !this.$v.dateToDisplay.required && errors.push('Date is required')
            return errors
        
        },
        amountErrors() {
            const errors = [];
            if (!this.$v.amount.$dirty) return errors;
            !this.$v.amount.required && errors.push('Amount is required');
            !this.$v.amount.minValue && errors.push('Amount should be numeric and greater than 0');
            return errors;
        },
        methodErrors() {
            const errors = []
            if (!this.$v.method.$dirty) return errors
            !this.$v.method.required && errors.push('Payment Method is required')
            return errors
        },
        accountErrors() {
            const errors = []
            if (!this.$v.account.$dirty) return errors
            !this.$v.account.required && errors.push('Account is required')
            return errors
        }
    },
    watch: {
        addPaymentDialog (val) { // For resetting Add Account Form
            if (!val) {
                this.$v.$reset();
                this.date = moment().format('YYYY-MM-DD');
                this.amount = '0.00';
                this.method = null;
                this.account = null;
            }
        }
    },
    created() {
        if (!(Object.values(this.accounts).length > 0)) {
            // this.loading = true;
            this.$store.dispatch('accounts/get', this.tenant);
        }
    }
}
</script>

<style>

</style>