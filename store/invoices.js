export const state = () => ({
  list: [],
  invoice: {}
});

export const actions = {
    async get({ commit, state, rootState }) {
        let _list = [];
        // const ref = this.$fireStore.collection('users').doc(userId);
        // try {
            // await exerciseRef.update({
            //     [`randomFoo.FooFoo`]: this.$fireStoreObj.FieldValue.delete()
            // });
        // } catch (e) {
        //     return Promise.reject(e);
        // }
        await this.$fireStore.collection('invoices')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, "=>", doc.data());
                    let _invoice = doc.data();

                    _list.push({
                      invoice: _invoice.invoice_code,
                      date: new Date(_invoice.created_date.seconds),
                      client: _invoice.client.account,
                      total: _invoice.total,
                      author: _invoice.agent.name,
                      remarks: _invoice.remarks,
                      id: doc.id
                    });
                });
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });

        commit("setList", _list);
    },
    async show({ commit }, id) {
        const response = await this.$axios.get(
            `${process.env.cmsURL}/posts/${id}`
        );
        commit("setPost", response.data);
    }
};

export const mutations = {
    setList: (state, invoices) => (state.list = invoices),
    setInvoice(state, invoice) {
        state.invoice = invoice;
    }
};