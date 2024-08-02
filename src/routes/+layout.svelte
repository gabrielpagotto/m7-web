<script>
	import "../app.css";
	import { invalidateAll } from "$app/navigation";

	export let data;

	async function logout() {
		const response = await fetch("/auth/signout", { method: "POST" });
		if (response.status === 200) {
			invalidateAll();
		}
	}
</script>

<div class="flex flex-col h-full items-center">
	<div
		class="w-full h-16 bg-gray-200 border border-gray-300 flex items-center justify-between"
	>
		<a href="/" class="font-bold text-lg px-10 text-gray-900 hover:no-underline"
			>M7 Academy</a
		>
		<div class="px-10">
			{#if data.user}
				<div class="flex items-center gap-5">
					<p class="font-bold text-lg">
						Olá {data.user.name}
					</p>
					<button on:click={logout}>Sair</button>
				</div>
			{:else}
				<div class="flex gap-2 items-center">
					<a href="/auth/signin" class="primary-btn">Entre agora</a>
				</div>
			{/if}
		</div>
	</div>
	<slot />
</div>
