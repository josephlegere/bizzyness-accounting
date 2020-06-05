<template>
    <v-row no-gutters>
        <v-col class="text-center">

            <h3>Invoice</h3>
            <h2>12345</h2>

            <v-container>
                <v-autocomplete
                    v-model="recipient"
                    :items="accounts"
                    :loading="isLoadingAccounts"
                    hide-no-data
                    filled
                    chips
                    placeholder="Accounts"
                    item-text="name"
                    item-value="name"
                    dense
                >
                <template v-slot:selection="data">
                    <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="remove(data.item)"
                    >
                        {{ data.item.name }}
                    </v-chip>
                </template>
                <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                        <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </template>
                </v-autocomplete>

                <v-dialog
                    ref="dialog"
                    v-model="datepicker"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date"
                            placeholder="Date"
                            readonly
                            dense
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="datepicker = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-container>

            <v-container>
                <v-toolbar
                    class="mb-1"
                    height="30"
                    elevation="2"
                    collapse
                >
                    <v-btn icon @click="add">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>

                <draggable-nested class="drag-list mt-md-3" :headers="headers" :items="list" />
            </v-container>

            <br>

            <v-sheet
                dark
                class="form-toolbar">
                <v-toolbar
                    color="secondary"
                    flat
                    height="50">
                    <v-toolbar-title class="mr-4">Total: {{total.toFixed(2)}}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-printer-search</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-send-circle-outline</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import DraggableNested from '../../components/DraggableNested';


export default {
    data () {
        return {
            bottomNav: 'recent',
            name: 'invoice-create',
            date: new Date().toISOString().substr(0, 10),
            datepicker: false,
            recipient: null,
            accounts: [],
            isLoadingAccounts: false,
            headers: [
                { value: 'key', text: 'Key' },
                { value: 'description', text: 'Description' },
                { value: 'quantity', text: 'Quantity' },
                { value: 'price', text: 'Price' },
                {
                    value: 'total',
                    text: 'Total',
                    readonly: true,
                    input: {
                        items: ['quantity', 'price'],
                        compute: function (a, c) { return a * c }
                    },
                    sum: true
                }
            ],
            list: [],
            total: 0.00
        }
    },
    methods: {
        add: function() {
            let _temp = {};
            
            this.headers.forEach(elem => {
                _temp[elem.value] = '';
            });
            _temp.items = [];

            this.list.push(_temp);
        },
        presets() {
            let _items = [];

            for (let i = 0; i < 5; i++) {
                let _record = {};

                this.headers.forEach(elem => {
                    _record[elem.value] = '';
                    if (elem.value === 'key') _record[elem.value] = i + 1;
                });
                _record.items = [];

                _items.push(_record);
            }

            this.list = _items;
        },
        temp_accounts() {
            this.accounts = [
                { header: 'Group 1' },
                { name: 'Sandra Adams', group: 'Group 1' },
                { name: 'Ali Connors', group: 'Group 1' },
                { divider: true },
                { header: 'Group 2' },
                { name: 'Britta Holt', group: 'Group 2' },
                { name: 'Jane Smith ', group: 'Group 2' }
            ];
        },
        remove (item) {
            this.recipient = null;
      }
    },
    created() {
        this.presets();
        this.temp_accounts();
    },
    components: {
        DraggableNested
    }
}
</script>

<style scoped>
    .form-toolbar {
        position:               fixed;
        z-index:                4;
        bottom:                 35px;
        right:                  0;
    }
    .drag-list {
        padding:                0 !important;
    }
</style>