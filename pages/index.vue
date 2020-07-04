<template>
	<v-row
		class="flex-column"
		justify="center"
		align="center"
	>
		<v-col
			xs12
			sm8
			md6
			class="mb-4"
		>
			<div class="text-center">
				<logo />
			</div>
		</v-col>

	</v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { getUserFromCookie, getUserFromSession } from '@/helpers'

export default {
	asyncData({ req, redirect }) {
		// if (process.server) {
		// 	console.log('server', req.headers)
		// 	const user = getUserFromCookie(req)
		// 	//   console.log('b', getUserFromCookie(req))
		// 	if (!user) {
		// 		console.log('redirecting server')
		// 		redirect('/login')
		// 	}
		// } else {
		// 	var user = this.$fireAuthObj().currentUser
		// 	if (!user) {
		// 		redirect('/login')
		// 	}
		// 	//   console.log($nuxt.$router)
		// }
		
	},
	components: {
		Logo
	}
}
</script>