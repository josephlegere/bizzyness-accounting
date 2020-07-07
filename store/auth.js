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
			let { email, uid } = await this.$fireAuth.currentUser;

			//Set the JWT to the cookie
			Cookie.set("access_token", token);

			//Set the user locally
			commit("setUser", { email, uid });
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	},

	signOut({ commit }) {
		console.log("Log Out");
		commit("setUser", null);
		return this.$fireAuth.signOut();
	}
};

export const mutations = {
	setUser(state, account) {
		state.loggeduser = account;
	}
};