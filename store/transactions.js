import moment from 'moment';

export const state = () => ({
	list: [],
	transaction: {}
});

export const actions = {
    async get({ commit }, { tenant }) {
        let _transactions = [];
		console.log(tenant);

        try {
            let transactionSnap = await this.$fire.firestore
                .collection("transactions")
                // .where("created_date", ">", new Date(dates[0]))
                // .where("created_date", "<", new Date(dates[dates.length - 1]))
                .where('tenant', '==', tenant)
                .get();
            
            transactionSnap.forEach(doc => {
                console.log(doc.id, "=>", doc.data());
                let { date, description, account, category, amount, notes, type, created_by } = doc.data();

                _transactions.push({
                    date: moment.unix(date.seconds),
                    description,
                    account,
                    category,
                    amount,
                    notes,
                    type,
                    created_by,
                    id: doc.id
                });
            });

            commit("setList", _transactions);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    },
};

export const mutations = {
    setList: (state, invoices) => (state.list = invoices)
};