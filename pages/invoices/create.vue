<template>
    <v-row no-gutters>
        <v-col class="text-center">

            <h3>Invoice</h3>
            <h2>{{invoice_number}}</h2>

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
                            v-model="dateStringFormat"
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
                    <v-toolbar-title class="mr-4">Total: {{accumulate.toFixed(2)}}</v-toolbar-title>

                    <v-spacer></v-spacer>
                    
                    <v-dialog v-model="preview" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-printer-search</v-icon>
                            </v-btn>
                        </template>
                        <v-card dark>
                            <v-toolbar dark color="primary">
                                <v-btn icon dark @click="preview = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Invoice</v-toolbar-title>
                            </v-toolbar>
                            <div v-if="preview">
                                <InvoiceView :invoice="invoice" :key="viewerwKey" :toPrint=false />
                            </div>

                        </v-card>
                    </v-dialog>
                    
                    <v-dialog v-model="print" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-send-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card dark>
                            <v-toolbar dark color="primary">
                                <v-btn icon dark @click="print = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Invoice</v-toolbar-title>
                            </v-toolbar>
                            <div v-if="print">
                                <InvoiceView :invoice="invoice" :key="viewerwKey" :toPrint=true />
                            </div>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import DraggableNested from '~/components/DraggableNested';
import InvoiceView from '~/components/InvoiceView';
import _ from 'lodash';

export default {
    data () {
        return {
            name: 'invoice-create',
            invoice_number: '12345',
            date: new Date().toISOString().substr(0, 10),
            datepicker: false,
            recipient: null,
            accounts: [],
            isLoadingAccounts: false,
            rowtypes: ['materials', 'jobs'],
            headers: [
                { value: 'key', text: 'Key' },
                { value: 'description', text: 'Description', colsize: 2 },
                { value: 'quantity', text: 'Quantity' },
                { value: 'price', text: 'Price', colsize: 2 },
                {
                    value: 'amount',
                    text: 'Amount',
                    colsize: 2,
                    readonly: true,
                    input: {
                        items: ['quantity', 'price'],
                        compute: function (a, c) { return a * c }
                    },
                    accumulate: 'sum'
                }
            ],
            list: [],
            currency: 'QR',
            preview: false,
            print: false
        }
    },
    methods: {
        add: function() {
            let _temp = {};
            
            this.headers.forEach(elem => {
                _temp[elem.value] = '';
            });
            _temp.items = [];
            _temp.rowtype = '';

            this.list.push(_temp);
        },
        presets() {
            let _items = [];

            for (let i = 0; i < 4; i++) {
                let _record = {};
                this.headers.forEach(elem => {
                    _record[elem.value] = '';
                    if (elem.value === 'key') _record[elem.value] = i + 1;
                });
                _record.items = [];
                _items.push(_record);
            }

            let _record = {};
            this.headers.forEach(elem => { //add a child
                _record[elem.value] = '';
                if (elem.value === 'key') _record[elem.value] = _items.length + 1;
            });
            _record.items = [];
            _record.rowtype = '';
            _items[_items.length-1].items.push(_record);

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
        },
        accumulate_list (list, headers) { //list => layout, headers => format
            return list.reduce((acc, curr) => {
                let _total;
                headers.forEach(heads => {
                    if (heads.hasOwnProperty('accumulate')) {
                        _total = Number((curr[heads.value]) || 0);
                    }
                });
                if (curr.items.length > 0)
                    _total += this.accumulate_list(curr.items, headers);

                return acc + _total;
            }, 0);
        },
        extractData(list, len = 0) {
            let _items = {};
            let _layout = [];

            list.forEach((elem, key) => {
                let _source = {};
                let _children = [];

                if (elem.items.length > 0) {
                    let _child = this.extractData(elem.items, len+1);
                    _children = _child.layout;
                    _items = _.merge(_items, _child.items);
                }

                if (this.rowtypes.includes(elem.rowtype)) {
                    if (!(_items.hasOwnProperty(elem.rowtype)))
                        _items[elem.rowtype] = {};

                    _items.materials[`${key}${len}`] = {
                        currency: this.currency,
                        name: elem.description,
                        price: elem.price,
                        quantity: elem.quantity
                    }
                    _source.origin = `items/${elem.rowtype}/${key}${len}`;
                }
                else
                    _source.content = elem.description;

                _layout.push({
                    children: _children,
                    key: elem.key,
                    source: _source
                });
            });

            return {
                items: _items,
                layout: _layout
            };
        }
    },
    computed: {
        dateStringFormat () {
            return new Date(this.date).toDateString().substr(3, 12);
        },
        accumulate () {
            return this.accumulate_list(this.list, this.headers);
        },
        invoice () {            
            let _records = this.extractData(this.list);

            return {
                author: 'Joseph Legere',
                client: this.recipient,
                date: this.date,
                invoice: this.invoice_number,
                items: _records.items, //local
                layout: _records.layout,
                remarks: '',
                total: this.accumulate
            }
        },
        viewerwKey () { //initially to enable rerender of component, now mainly triggers a function (but still need to return a date)
            if (this.preview)
                return Date.now(); //opened
            else
                return 0; //closed
        }
    },
    created() {
        this.presets();
        this.temp_accounts();
        //console.log(this.extractData(this.list));
    },
    components: {
        DraggableNested,
        InvoiceView
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