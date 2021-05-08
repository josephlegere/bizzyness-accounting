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
                                <v-text-field
                                    label="Account *"
                                    v-model="account"
                                ></v-text-field>
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
                    color="red darken-4"
                    text
                    @click="addPaymentDialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="#663b0e"
                    dark
                    @click="addPaymentDialog = false"
                >
                    Add Payment
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment';
import { required, numeric } from 'vuelidate/lib/validators';

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
            numeric
        },
        method: {
            required
        },
        account: {
            required
        }
    },
    computed: {
        dateToDisplay() {
            return moment(this.date).format('MMMM Do, YYYY');
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
    }
}
</script>

<style>

</style>