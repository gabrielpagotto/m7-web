<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { useFetchState } from "$lib/hooks/useFetchState";
	import { parseFetchError as throwParsedError } from "$lib/utils/responsesUtils";

	const title = "Crie sua conta";

	let name: string;
	let email: string;
	let password: string;
	let passwordConfirmation: string;

	const { runAction, isLoading, isError } = useFetchState(async () => {
		const signupResponse = await fetch("/m7-api/auth/signup", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
			}),
		});

		if (signupResponse.status === 201) {
			const signupResponseData = await signupResponse.json();
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
			type="text"
			placeholder="Como podemos de te chamar?"
			name="name"
			id="name"
			bind:value={name}
			min="4"
			required
		/>
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
		<input
			type="password"
			placeholder="Confirmação de senha"
			name="password_confirmation"
			bind:value={passwordConfirmation}
			min="6"
			required
		/>
		<button type="submit" class="primary-btn" disabled={$isLoading}>
			{#if $isLoading}
				Cadastrando...
			{:else}
				Cadastrar novo usuário
			{/if}
		</button>
		<p>
			Já possui uma conta? <a href="/auth/signin">Entrar agora.</a>
		</p>
	</form>
</div>
