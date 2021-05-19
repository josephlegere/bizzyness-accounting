<template>
    <v-row no-gutters>
        <v-col>
            <v-card>
                <v-data-table
                    class="mt-15"
                    :headers="headers"
                    :items="customers"
                    no-data-text="No Customer Records Available"
                    group-by="group"
                    :group-desc="true"
                >
                    <template v-slot:group.header="{items, headers, isOpen, toggle}">
                        <th :colspan="headers.length">
                            <v-row no-gutters>
                                <v-icon @click="toggle">
                                    {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                                </v-icon>
                                <v-chip color="secondary">
                                    {{ items[0].group }}
                                </v-chip>
                            </v-row>
                        </th>
                    </template>
                    <template v-slot:item.customer="{ item }">
                        {{ item.customer.account_type }}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <!-- <v-icon
                            small
                            class="mr-2"
                            @click="deleteItem(item)"
                        >
                            mdi-pencil-outline
                        </v-icon> -->
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-close
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>



                <v-row
                    class="toolbar-container"
                    no-gutters
                >
                    <v-col
                        md="3"
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
                                    @click="addCustomerModal = !addCustomerModal"
                                >
                                    Add Customer
                                </v-btn>
                                
                                <v-bottom-sheet v-model="addCustomerModal" scrollable transition="dialog-bottom-transition">
                                    <v-card class="rounded-t-xl">
                                        <v-toolbar dark dense class="rounded-t-xl">
                                            <v-btn icon dark @click="addCustomerModal = !addCustomerModal">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                            <v-toolbar-title>Add Customer</v-toolbar-title>
                                        </v-toolbar>

                                        <v-card-text class="my-md-16">
                                            <v-container>
                                                <v-form ref="form" v-model="validate">
                                                    <v-row>
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
import moment from 'moment';
import { mapState } from 'vuex';

export default {
    data () {
        return {
            headers: [
                { text: 'Customer', value: 'name' },
                { text: 'Profile', value: 'customer' },
                { text: '', value: 'action' }
            ],
            addCustomerModal: false,
            validate: false
        }
    },
    methods: {
        deleteItem(item) {
            console.log(item);
        }
    },
    computed: {
        ...mapState({
            customers: state => state.customers.list,
            loggeduser: state => state.auth.loggeduser
        }),
        tenant() {
            return this.loggeduser.tenantid.split('/')[1];
        }
    },
    async created() {
        await this.$store.dispatch('customers/get', this.tenant);
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