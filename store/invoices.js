import moment from 'moment';

export const state = () => ({
	list: [],
	invoice: null,
	current: null
});

export const actions = {
    async get({ commit, state, rootState }, { dates, tenant }) {
        let _list = [];
		console.log(dates, tenant)
        
        await this.$fire.firestore
			.collection("invoices")
			.where("date", ">=", new Date(dates[0]))
			.where("date", "<=", new Date(dates[dates.length - 1]))
			.where('tenant', '==', tenant)
			.orderBy("date")
			.orderBy("invoice_code")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					console.log(doc.id, "=>", doc.data());
					let { invoice_code, date, dateDue, customer, total, agent, remarks, items, layout, payments } = doc.data();

					_list.push({
						invoice_code,
						date: moment.unix(date.seconds),
						dateDue: moment.unix(dateDue.seconds),
						customer,
						total,
						author: agent.name,
						remarks,
						items,
						layout,
						payments,
						id: doc.id
					});
				});
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});

        commit("setList", _list);
    },
	async details({ commit }, { code, tenant }) {
		try {
			let invoiceSnap = await this.$fire.firestore
				.collection("invoices")
				.where("invoice_code", "==", parseInt(code))
				.where('tenant', '==', tenant)
				.get();
			
			if (invoiceSnap.empty) throw 'Unauthorized access to this data!';

			let invoice;
			let payments = [];
			invoiceSnap.forEach(doc => {
				let { invoice_code, date, dateDue, customer, total, agent, remarks, items, layout } = doc.data();
				invoice = {
					invoice_code,
					date: moment.unix(date.seconds),
					dateDue: moment.unix(dateDue.seconds),
					customer,
					total,
					author: agent.name,
					remarks,
					items,
					layout,
					id: doc.id
				};
			});
			
			let paymentsSnap = await this.$fire.firestore.collection('invoices').doc(invoice.id).collection('payments').get(); paymentsSnap.forEach(doc => {
				payments.push(doc.data());
			});
			invoice.payments = payments;

			commit('setInvoice', invoice);
		}
		catch (err) {
			console.log(err);
			throw err;
		}
	},
    async add({ commit }, invoice) {
        //const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });
        console.log(invoice);
        return await this.$fire.firestore.collection('invoices').add(invoice);
    },
	async next({ commit }, tenant) {
        let invoice_code = 0;

        await this.$fire.firestore
			.collection("tenant_invoices")
			.doc(tenant)
			.get()
			.then(doc => {
				let tenant_invoices = doc.data();
				invoice_code = tenant_invoices.next_invoice;
			})
			.catch(err => {
			console.log("Error getting documents", err);
			});

        commit("setNext", invoice_code);
	},
	async payments({ commit }, id) {
		try {
			let payments = [];
			let paymentsSnap = await this.$fire.firestore.collection('invoices').doc(id).collection('payments').get();
			paymentsSnap.forEach(doc => {
				payments.push(doc.data());
			});
			commit('setPayments', payments);
		}
		catch (err) {
			console.log(err);
			throw err;
		}
	},
	async payment_add({ commit }, { invoice, payment }) {
		try {
			await this.$fire.firestore.collection('invoices').doc(invoice).collection('payments').add(payment);
			commit('newPayment', payment);
;		}
		catch (err) {
			throw err;
		}
	}
};

export const mutations = {
    setList: (state, invoices) => (state.list = invoices),
    setInvoice: (state, invoice) => (state.invoice = invoice),
    setNext(state, invoice) {
        state.current = invoice;
    },
	setPayments: (state, payments) => (state.invoice.payments = payments),
	newPayment: (state, payment) => (state.invoice.payments.push(payment))
};