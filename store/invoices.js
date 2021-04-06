import moment from 'moment';

export const state = () => ({
	list: [],
	invoice: {},
	current: null
});

export const actions = {
    async get({ commit, state, rootState }, { dates, tenant }) {
        let _list = [];
		console.log(dates, tenant)
        
        await this.$fire.firestore
			.collection("invoices")
			.where("created_date", ">", new Date(dates[0]))
			.where("created_date", "<", new Date(dates[dates.length - 1]))
			.where('tenant', '==', tenant)
			.orderBy("created_date")
			.orderBy("invoice_code")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					console.log(doc.id, "=>", doc.data());
					let _invoice = doc.data();

					_list.push({
						invoice_code: _invoice.invoice_code,
						date: moment.unix(_invoice.created_date.seconds),
						customer: _invoice.customer,
						total: _invoice.total,
						author: _invoice.agent.name,
						remarks: _invoice.remarks,
						items: _invoice.items,
						layout: _invoice.layout,
						id: doc.id
					});
				});
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});

        commit("setList", _list);
    },
    // async show({ commit }, id) {
    //     const response = await this.$axios.get(
    //         `${process.env.cmsURL}/posts/${id}`
    //     );
    //     commit("setPost", response.data);
    // },
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
    }
};

export const mutations = {
    setList: (state, invoices) => (state.list = invoices),
    setInvoice(state, invoice) {
        state.invoice = invoice;
    },
    setNext(state, invoice) {
        state.current = invoice;
    }
};