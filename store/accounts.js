export const state = () => ({
	list: [],
	new: {}
});

export const actions = {
	async get({ commit }, tenant) {
		let _list = {};

		await this.$fire.firestore
			.collection("tenant_accounts")
			.doc(tenant)
			.collection("accounts")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					//console.log(doc.id, "=>", doc.data());
					let { account_category, account_type, currency, currency_detail, description, name, set_date } = doc.data();

					_list[doc.id] = {
						account_category,
						account_type,
						currency,
						currency_detail,
						description,
						name,
						set_date
					};
				});
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});

		commit("setList", _list);
	},
	async add({ commit }, { newAccount, tenant }) {
		console.log(newAccount);
		console.log(tenant);
		// commit("insert", newAccount);

		return await this.$fire.firestore.collection('tenant_accounts').doc(tenant).collection('accounts').add(newAccount);
	}
};

export const mutations = {
    setList: (state, accounts) => (state.list = accounts),
	insert: (state, newAccount) => (state.list = { ...state.list, ...newAccount })
};