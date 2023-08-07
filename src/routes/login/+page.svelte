<script lang="ts">
  export let form;
</script>

{JSON.stringify(form)}
<h1>Sign in</h1>
<form method="post">
	<label for="email">email</label>
	<input name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
<a href="/signup">Create an account</a>