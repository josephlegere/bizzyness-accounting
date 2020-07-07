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

export default {
	components: {
		Logo
	}
}
</script>