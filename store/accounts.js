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
	add({ commit }, { account, tenant }) {
		// return await this.$fire.firestore.collection('tenant_accounts').add(account);
	}
};

export const mutations = {
    setList: (state, accounts) => (state.list = accounts)
};