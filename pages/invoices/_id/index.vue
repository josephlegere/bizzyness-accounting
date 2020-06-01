<template>
    <v-row no-gutters="">
        <v-col>
            <v-card>
                {{currentPage}} / {{pageCount}}
                <PDFRender
                    :src="generatePDF"
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

export default {
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
            headers: [{key: 'Item\nNo.', description: 'Description', quantity: 'Qty', price: 'Unit\nPrice', amount: 'Amount QRS.'}],
            body: [],
            footer: [],
            total: 0
        }
    },
    methods: {
        fillBody() {
            let _temp_records = [];
            this.invoice.layout.forEach(elem => {
                let _temp_object = {};
                _temp_object.key = elem.key; //key

                if (elem.source.hasOwnProperty('content'))
                    _temp_object.description = elem.source.content;
                else if (elem.source.hasOwnProperty('origin') && elem.source.hasOwnProperty('key')) {
                    let _item = this.invoice.items[elem.source.key];

                    _temp_object.description = _item.name; //description
                    _temp_object.quantity = _item.quantity; //quantity
                    _temp_object.price = this.numberWithCommas((_item.price).toFixed(2)); //prices
                    _temp_object.amount = this.numberWithCommas((_item.price * _item.quantity).toFixed(2)); //total price
                    this.total += _item.price * _item.quantity;
                }

                console.log(_temp_object)
                _temp_records.push(_temp_object);
            });
            this.body = _temp_records;
        },
        fillFooter() {
            let _footer = [];
            _footer[0] = [
                { content: 'Only', colSpan: 4, styles: { halign: 'left' } },
                { content: this.numberWithCommas(this.total.toFixed(2)), styles: { halign: 'right' }}
            ];
            this.footer = _footer;
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            let doc = new jsPDF();

            doc.setFontSize(18);
            doc.text(`Goodwill Electrical & Mechanical Services`, 50, 22);

            doc.setFontSize(13);
            doc.text(`Doha, Qatar`, 90, 28);

            doc.setFontSize(15);
            doc.text(`BANK PAYMENT VOUCHER`, 65, 34);

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
            
            doc.rect(14, 14, 182, doc.autoTable.previous.finalY - 14); //border
            
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

<style>

</style>