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
		console.log(access);
		try {
			//Login the user
			await this.$fireAuth.signInWithEmailAndPassword(
				access.email,
				access.password
			);

			//Get JWT from Firebase
			const token = await this.$fireAuth.currentUser.getIdToken();
			let { email, uid, displayName } = await this.$fireAuth.currentUser;// displayName is for testing purposes, is used by other signIn options

			let doc = await this.$fireStore
				.collection('users')
				.doc(uid)
				.get();
			
			let { name, employee_code, tenant_group } = doc.data();
			let { account, tenantid, system_config, daysoff } = tenant_group;

			let _user = {
				uid,
				id: `users/${uid}`,
				email,
				name,
				account,
				tenantid,
				system_config,
				daysoff
			};

			if (employee_code) _user.employee_code = employee_code;

			//Set the user locally
			commit("setUser", _user);
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	},

	async signOut({ commit }) {
		console.log("Log Out");
		await this.$fireAuth.signOut();
		commit("setUser", null);
	}
};

export const mutations = {
	setUser(state, account) {
		state.loggeduser = account;
	}
};