<template>
    <v-row no-gutters="">
        <v-col>
            <v-card>

                <div v-show="pageCount > 1">
                    <v-btn x-small class="mx-1 move-prev" fab fixed right bottom @click="movePage('prev')" color="primary">
                        <v-icon dark>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn x-small class="mx-1" fab fixed right bottom @click="movePage('next')" color="primary">
                        <v-icon dark>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>

                <h3 class="text-right mr-1">
                    {{currentPage}} / {{pageCount}}
                </h3>

                <PDFRender
                    :src="generatePDF"
                    :page="currentPage"
                    @num-pages="pageCount = $event"
                    @page-loaded="currentPage = $event"
                ></PDFRender>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PDFRender from 'vue-pdf';
import { mapState } from 'vuex';
import num_convert from 'number-to-words';
import { ToWords } from 'to-words';

export default {
    data() {
        return {
            currentPage: 1,
            pageCount: 0,
            headers: [{key: 'Item\nNo.', description: 'Description', quantity: 'Qty', price: 'Unit\nPrice', amount: 'Amount QRS.'}],
            body: [],
            defaultBodySize: 60,
            footer: [],
            total: 0,
            toWords: new ToWords()
        }
    },
    methods: {
        fillBody() {
            let _temp_records = [];
            this.invoice.layout.forEach(elem => {
                let _temp_object = {};
                _temp_object.key = elem.key; //key

                if (elem.source.hasOwnProperty('content'))
                    _temp_object.description = this.viewFormat(elem.source.content);
                else if (elem.source.hasOwnProperty('origin')) {
                    let _item = this.getSourceData(this.invoice, elem.source.origin.split('/'));

                    _temp_object.description = _item.name; //description
                    _temp_object.quantity = _item.quantity; //quantity
                    _temp_object.price = this.numberWithCommas((_item.price).toFixed(2)); //prices
                    _temp_object.amount = this.numberWithCommas((_item.price * _item.quantity).toFixed(2)); //total price
                    this.total += _item.price * _item.quantity;
                }

                //console.log(_temp_object)
                _temp_records.push(_temp_object);
            });
            this.body = _temp_records;
        },
        fillFooter() {
            let _footer = [];
            _footer[0] = [
                { content: `${this.toWords.convert(this.total)} Qatar Riyals Only`, colSpan: 4, styles: { halign: 'left' } },
                { content: this.numberWithCommas(this.total.toFixed(2)), styles: { halign: 'right' }}
            ];
            this.footer = _footer;
        },
        tempBodyData() {
            let _data = [
                {description: 'Hello'},
                {description: 'Hi'},
                {description: 'What is up'},
                {description: 'COntrol Power'},
                {description: 'Slary for who'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'},
                {description: 'Hello'}
            ];

            _data.forEach((elem, key) => {
                let _temp_object = {};
                _temp_object.key = key + 1;
                _temp_object.description = elem.description;
                this.body.push(_temp_object)
            });
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        firstLetterUpperCase(str) { //make all first letters capitals
            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        },
        getSourceData(obj, arr) {
            let _item;
            if (arr.length > 1)
                _item = this.getSourceData(obj[arr[0]], arr.slice(1))
            else
                _item = obj[arr[0]];

            return _item;
        },
        movePage(action) {
            if (action === 'prev') {
                if (this.currentPage > 1)
                    this.currentPage--;
            }
            else if (action === 'next') {
                if (this.currentPage < this.pageCount)
                    this.currentPage++
            }
        },
        viewFormat(txt) {
            let formattedText = txt;
            formattedText = formattedText.replace(/\\n/g, '\n');
            return formattedText;
        }
    },
    asyncData() {
        // console.log()
    },
    created: function() {
        this.fillBody(); //set body
        this.fillFooter();
    },
    computed: {
        ...mapState({
            invoice: state => state.invoices.invoice
        }),
        generatePDF() {
            let doc = new jsPDF(); //default => unit: 'mm', format: 'a4',

            // doc.setFontSize(18);
            // doc.text(`Goodwill Electrical & Mechanical Services`, 50, 22);

            // doc.setFontSize(13);
            // doc.text(`Doha, Qatar`, 90, 28);

            // doc.setFontSize(15);
            // doc.text(`BANK PAYMENT VOUCHER`, 65, 34);

            doc.setFontSize(7);
            doc.text(`(Edge)`, 1, 1);

            doc.setFontSize(11);
            doc.text(`Cash/Credit Invoice`, 85, 42);

            doc.autoTable({
                head: this.headers,
                body: this.body,
                foot: this.footer,
                startY: 54,
                theme: 'plain',
                tableLineColor: [0, 0, 0],
                tableLineWidth: 0.2,
                styles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 0,
                    halign: 'center'
                },
                headStyles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 0.2,
                    fillColor: [255, 255, 255],
                    textColor: 0,
                    fontSize: 11,
                    valign: 'middle'
                },
                footStyles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 0.2,
                },
                columnStyles: {
                    keys: { valign: 'top' },
                    description: { halign: 'left' },
                    price: { halign: 'right' },
                    amount: { halign: 'right' }
                }
            });
            
            doc.rect(14, 14, 182, doc.lastAutoTable.finalY - 14); //border
            console.log(doc.lastAutoTable)
            console.log(doc.lastAutoTable.finalY - doc.lastAutoTable.pageStartY)
            console.log(doc.lastAutoTable.height)
            console.log(doc.lastAutoTable.height - (doc.lastAutoTable.headHeight + doc.lastAutoTable.footHeight))
            
            doc.autoPrint({ variant: 'non-conform' });
            let _pdf = doc.output('datauristring');
            return _pdf;
        }
    },
    components: {
        PDFRender
    }
}
</script>

<style scoped>
    .move-prev {
        right:                  60px;
    }
</style>