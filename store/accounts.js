export const state = () => ({
    list: []
});

export const actions = {
    async get({ commit, state, rootState }) {
        let _list = [];

        await this.$fireStore
          .collection("tenant_accounts")
          .doc('HiternQX1hmdvcxnrSIr')
          .collection("accounts")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              //console.log(doc.id, "=>", doc.data());
              let { account_name, company, representatives } = doc.data();

              _list.push({
                name: account_name,
                group: company,
                client: {
                  account: account_name,
                  id: representatives[0].id,
                  name: representatives[0].name
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
    setList: (state, accounts) => (state.list = accounts)
};