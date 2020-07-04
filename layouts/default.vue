<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<div>
				<v-btn
					bottom
					right
					absolute
					small
					icon
					@click.stop="miniVariant = !miniVariant"
				>
					<v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
				</v-btn>
			</div>
		</v-navigation-drawer>

		<v-app-bar
			fixed
			flat
			app
			dense
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-xl-none" />
			<v-toolbar-title v-text="title" />
			<v-spacer />
			<v-btn
				icon
				@click.stop="rightDrawer = !rightDrawer"
			>
				<v-icon>mdi-account-circle</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<v-container>
			<nuxt />
			</v-container>
		</v-content>
		<v-navigation-drawer
			v-model="rightDrawer"
			:right="right"
			temporary
			fixed
		>
			<v-list>
				<v-list-item @click.native="right = !right">
					<v-list-item-action>
					<v-icon light>
						mdi-repeat
					</v-icon>
					</v-list-item-action>
					<v-list-item-title>Switch drawer (click me)</v-list-item-title>
				</v-list-item>
				<v-list-item>
					<v-btn
						color="primary"
						class="mr-4"
						@click="signOut"
					>
						Sign Out
					</v-btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-footer
			fixed
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
import Cookies from 'js-cookie';

export default {
	data () {
		return {
			loggedIn: false,
			drawer: true,
			items: [
			{
				icon: 'mdi-apps',
				title: 'Welcome',
				to: '/'
			},
			{
				icon: 'mdi-form-select',
				title: 'Invoices',
				to: '/invoices'
			},
			{
				icon: 'mdi-text-box-plus-outline',
				title: 'Create Invoice',
				to: '/invoices/create'
			},
			{
				icon: 'mdi-chart-bubble',
				title: 'Inspire',
				to: '/inspire'
			}
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Accounting'
		}
	},
	methods: {
		setupFirebase() {
			this.$fireAuthObj().onAuthStateChanged(user => {
				if (user) {
					console.log('signed in');

					this.$fireAuthObj()
						.currentUser.getIdToken(true)
						.then(token => Cookies.set('access_token', token));

					this.loggedIn = true;
				}
				else {
					Cookies.remove('access_token');

					// No user is signed in.
					this.loggedIn = false;
					console.log('signed out', this.loggedIn);
				}
			});
		},
        signOut: function(err) {
			this.$store.dispatch('auth/signOut')
				.then(() => {
					this.$router.replace({ path: '/login' });
				})
				.catch(err => {
					alert(err.message);
				});
        }
	},
	mounted() {
		//this.setupFirebase();
	}
}
</script>

<style>
    .handle {
        cursor:                     grab;
    }
    .handle:active {
        cursor:                     grabbing;
    }
</style>