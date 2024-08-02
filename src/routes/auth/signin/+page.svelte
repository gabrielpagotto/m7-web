<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { useFetchState } from "$lib/hooks/useFetchState";
	import { parseFetchError as throwParsedError } from "$lib/utils/responsesUtils";
	import { type AuthenticationResponse } from "$lib/types/apiResponses";

	const title = "Entre na sua conta";

	let email: string;
	let password: string;

	const { runAction, isLoading, isError } = useFetchState(async () => {
		const signupResponse = await fetch("/m7-api/auth/signin", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		if (signupResponse.status === 200) {
			const signupResponseData: AuthenticationResponse =
				await signupResponse.json();
			const jwtResponse = await fetch("/auth/jwt", {
				method: "POST",
				body: JSON.stringify(signupResponseData),
			});

			if (jwtResponse.status === 200) {
				return invalidateAll();
			}
			throwParsedError(await jwtResponse.json());
		}
		throwParsedError(await signupResponse.json());
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="h-screen w-screen flex items-center justify-center">
	<form on:submit|preventDefault={runAction} action="" class="form-box">
		<h1 class="text-xl font-bold">{title}</h1>
		{#if $isError}
			<div class="error-box">
				{$isError}
			</div>
		{/if}
		<input
			type="email"
			placeholder="Email"
			name="email"
			id="email"
			bind:value={email}
			required
		/>
		<input
			type="password"
			placeholder="Senha"
			name="password"
			id="password"
			min="6"
			bind:value={password}
			required
		/>
		<button type="submit" class="primary-btn" disabled={$isLoading}>
			{#if $isLoading}
				Entrando...
			{:else}
				Entrar
			{/if}
		</button>
		<p>
			Não possui uma conta? <a href="/auth/signup">Cadastre-se.</a>
		</p>
	</form>

	<style>
		/* Ele irá trabalhar aqui, na parte css */
	</style>
</div>
