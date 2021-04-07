export const state = () => ({
    list: []
});

export const actions = {
    async get({ commit }, tenant) {
        let _list = [];

        await this.$fire.firestore
            .collection("tenant_customers")
            .doc(tenant)
            .collection("customers")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, "=>", doc.data());
                    let { account, group, account_type } = doc.data();
                    let id = '';

                    if (account_type === 'tenant') id = `tenants/${doc.id}`;
                    else id = `customers/${doc.id}`;

                    _list.push({
                        name: account,
                        group,
                        customer: {
                            account,
                            id,
                            account_type
                        },
                        id: doc.id
                    });
                });
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });

        commit("setList", _list);
    }
};

export const mutations = {
    setList: (state, customers) => (state.list = customers)
};
