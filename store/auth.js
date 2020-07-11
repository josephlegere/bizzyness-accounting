import Cookie from 'js-cookie';

export const state = () => ({
	loggeduser: null
});

export const actions = {
	async signUp({ commit }, { email, password }) {
		await this.$fireAuth
			.createUserWithEmailAndPassword(email, password)
			.then(cred => {
			return this.$fireStore
				.collection("users")
				.doc(cred.user.uid)
				.set({
				name: ""
				});
			});
	},

	async signInWithEmail({ commit }, access) {
		//console.log(email)
		try {
			//Login the user
			await this.$fireAuth.signInWithEmailAndPassword(
				access.email,
				access.password
			);

			//Get JWT from Firebase
			const token = await this.$fireAuth.currentUser.getIdToken();
			let { email, uid, displayName } = await this.$fireAuth.currentUser;
			let _details = null;

			await this.$fireStore
				.collection('users')
				.doc(uid)
				.get()
				.then(doc => {
					let _user = doc.data();
					_details = {
						id: `users/${uid}`,
						account: _user.tenant_group.account,
						tenantid: _user.tenant_group.tenantid
					}
				})
				.catch(err => {
					console.log("Error getting documents", err);
				});

			//Set the JWT to the cookie
			Cookie.set("access_token", token);

			let { id, account, tenantid } = _details;

			//Set the user locally
			commit("setUser", { email, uid, name: displayName, id, account, tenantid });
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	},

	async signOut({ commit }) {
		console.log("Log Out");
		await this.$fireAuth.signOut();
		await Cookie.remove("access_token");
		commit("setUser", null);
	}
};

export const mutations = {
	setUser(state, account) {
		state.loggeduser = account;
	}
};