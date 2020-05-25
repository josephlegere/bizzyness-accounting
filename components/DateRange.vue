<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-dialog
                ref="dialog"
                v-model="datepicker"
                :return-value.sync="dates"
                persistent
                width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        hide-details
                        prepend-icon="mdi-calendar"
                        placeholder="Date"
                        readonly
                        v-on="on"
                    ></v-combobox>
                </template>
                <v-date-picker v-model="dates" @click:date="updateRange" range scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="datepicker = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(dates)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
        </v-col>
        <v-col cols="12" class="mt-1 d-flex justify-end">
            <v-chip
                class="mr-2"
                @click="weekly"
                small
            >
                Weekly
            </v-chip>
            <v-chip
                @click="monthly"
                small
            >
                Monthly
            </v-chip>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
        return {
            datepicker: false,
            dates: [],
            suggested: ''
        }
    },
    props: {
        suggests: {
            type: Array
        }
    },
    methods: {
        weekly() {
            console.log('Weekly')
            this.dates = this.suggests;
        },
        monthly() {
            console.log('Monthly')
        },
        updateRange() {
            let newRange = this.dates;
            this.$emit('update-range', newRange);
        }
    }
}
</script>

<style>

</style>