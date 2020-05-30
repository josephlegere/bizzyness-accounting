<template>
    <div>
        {{ $route.params.id }}
    </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
    asyncData() {
        // console.log()
        let doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Goodwill Electrical & Mechanical Services`, 50, 22);
        
        doc.autoPrint({ variant: 'non-conform' });
        let _pdf = doc.save('invoice.pdf');
    },
    methods: {
    }
}
</script>

<style>

</style>