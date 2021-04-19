import moment from 'moment';
import _ from 'lodash';

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
                .where('tenantid', '==', tenant)
                .get();
            
            transactionSnap.forEach(doc => {
                // console.log(doc.id, "=>", doc.data());
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
                    id: doc.id,
                    priority: 2,
                    datatype: 'record',
                    editing: false
                });
            });

            commit("setList", _transactions);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    },
    async add({ commit }, { newTransaction, tenantid }) {
		// commit("insert", newTransaction);
        let _insert = { ...newTransaction, tenantid, created: this.$fireModule.firestore.FieldValue.serverTimestamp() };
        
        try {
            let ref = await this.$fire.firestore.collection('transactions').add(_insert);
            let _commit = { ...newTransaction, id: Date.now(), priority: 1, datatype: 'record', editing: true };
            commit('insert', _commit);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
	},
	async edit({ commit, state }, { transaction, updates }) {
        try {
            let _index = state.list.findIndex((elem) => elem.id === transaction);
            let _updates = {};
            Object.keys(updates).forEach(key => {
                _updates[key] = state.list[_index][key];
            });
		    await this.$fire.firestore.collection('transactions').doc(transaction).update(_updates);
            commit('update', { id: transaction, updates: { editing: false }});
        }
        catch (err) {
            console.error(err);
            throw err;
        }
	}
};

export const mutations = {
    setList: (state, transactions) => (state.list = transactions),
    insert: (state, newTransaction) => {
        console.log(newTransaction);
        state.list.push(newTransaction);
    },
    update: (state, transaction) => {
		let { id, updates } = transaction;
        let _index = state.list.findIndex((elem) => elem.id === id);
		let _transactions = _.cloneDeep(state.list);

        if (!_transactions[_index].editing) _transactions[_index].editing = true;
        Object.entries(updates).forEach(elem => {
            let _key = elem[0];
            let _value = elem[1];
            _transactions[_index][_key] = _value;
        });

		state.list = _transactions;
	}
};