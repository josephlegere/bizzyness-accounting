import Cookie from 'js-cookie';

export const state = () => ({
	loggeduser: null
});

export const actions = {
	async signUp({ commit }, { email, password }) {
		await this.$fireAuth.createUserWithEmailAndPassword(email, password).then(cred => {
			return this.$fireStore.collection('users').doc(cred.user.uid).set({
				name: ''
			});
		});
	},

	async signInWithEmail({ commit }, { email, password }) {
		//console.log(email)
		try {
			//Login the user
			await this.$fireAuth.signInWithEmailAndPassword(email, password);

			//Get JWT from Firebase
			const token = await this.$fireAuth.currentUser.getIdToken();
			let { uid } = await this.$fireAuth.currentUser;

			//Set the JWT to the cookie
			Cookie.set('access_token', token);

			//Set the user locally
			commit('setUser', { uid });
		}
		catch (err) {
			console.error(err.message);
			throw err;
		}
	},

	signOut() {
		console.log('Log Out')
		return this.$fireAuth.signOut()
	}
};

export const mutations = {
	setUser(state, account) {
		state.loggeduser = account;
	}
};