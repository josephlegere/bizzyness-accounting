<template>
    <v-row no-gutters="">
        <v-col>
            <v-card>
                <b>{{ $route.params.id }}</b>
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
            headers: [['Item No.', 'Description', 'Qty', 'Unit Price', 'Amount QRS.']],
            body: []
        }
    },
    methods: {
        fillBody() {
            let _temp_records = [];
            this.invoice.layout.forEach(elem => {
                let _temp_array = [];
                _temp_array.push(elem.key); //key

                if (elem.source.hasOwnProperty('content'))
                    _temp_array.push(elem.source.content);
                else if (elem.source.hasOwnProperty('origin') && elem.source.hasOwnProperty('key')) {
                    let _item = this.invoice.items[elem.source.key];

                    _temp_array.push(_item.name); //description
                    _temp_array.push(_item.quantity); //quantity
                    _temp_array.push(_item.price); //price
                    _temp_array.push(_item.price * _item.quantity); //total price
                }

                console.log(_temp_array)
                _temp_records.push(_temp_array);
            });
            this.body = _temp_records;
        }
    },
    asyncData() {
        // console.log()
    },
    created: function() {
        this.fillBody(); //set body
        
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
            doc.text(`Petty Cash Replenishment`, 14, 42);

            doc.autoTable({
                head: this.headers,
                body: this.body,
                startY: 54,
                theme: 'grid',
                tableLineColor: [0, 0, 0],
                tableLineWidth: 0.2,
                styles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 0.2
                },
                headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: 0,
                    fontSize: 11
                }
            });
            
            //doc.rect(14, 14, 182, doc.autoTable.previous.finalY - 14); //border
            doc.rect(14, 14, 182, 80); //border
            
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