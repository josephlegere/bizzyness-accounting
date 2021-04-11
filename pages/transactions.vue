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
                    </v-row>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="transactions"
                    :search="search"
                    no-data-text="No Transactions Available"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>

            <v-row
                class="toolbar-container"
                no-gutters
            >
                <v-col
                    md="10"
                    class="ml-md-auto"
                >
                    <v-sheet
                        color="transparent"
                        class="form-toolbar">
                        <v-toolbar
                            dark
                            height="60">
                            <v-btn
                                outlined
                                :small="$vuetify.breakpoint.smAndDown"
                            >
                                <v-icon :small="$vuetify.breakpoint.smAndDown">mdi-magnify</v-icon>
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                                outlined
                                :small="$vuetify.breakpoint.smAndDown"
                            >
                                <!-- @click="addAccountModal = !addAccountModal" -->
                                Add Income
                            </v-btn>

                            <v-btn
                                outlined
                                :small="$vuetify.breakpoint.smAndDown"
                                class="ml-md-1"
                            >
                                Add Expense
                            </v-btn>

                            <v-menu offset-y top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        dark
                                        outlined
                                        :small="$vuetify.breakpoint.smAndDown"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ml-md-1"
                                    >
                                        More
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>Journal Entry</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>Blank</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                        </v-toolbar>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data () {
        return {
            search: '',
            headers: [
                { text: 'Date', value: 'date' },
                { text: 'Description', value: 'description' },
                { text: 'Account', value: 'account' },
                { text: 'Category', value: 'category' },
                { text: 'Amount', value: 'amount' },
                { text: 'Actions', value: 'actions', sortable: false }
            ]
        }
    },
    computed: {
        ...mapState({
            transactions: state => state.transactions.list,
            loggeduser: state => state.auth.loggeduser
        }),
        tenant() {
            return this.loggeduser.tenantid.split('/')[1];
        }
    },
    async created() {
        await this.$store.dispatch('transactions/get', { tenant: this.tenant });
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
</style>