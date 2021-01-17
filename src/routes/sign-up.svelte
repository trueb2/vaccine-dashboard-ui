<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
  
    let password = "";
    let email = "";
    let error;
  
    const handleSignUp = async () => {
      const response = await fetch("/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const parsed = await response.json();
  
      if (parsed.error) {
        error = parsed.error;
      } else {
        $session.token = parsed.token;
        goto("/district");
      }
    };
  </script>

<a href="login">Already created an account? Sign In</a>

<h1>Create Account</h1>

<form on:submit|preventDefault="{handleSignUp}" method="post">
    <label>
        Email:
        <input type="email" bind:value="{email}" />
      </label>
      <label>
        Password:
        <input type="password" bind:value="{password}" />
      </label>
      <button type="submit">Sign Up</button>
</form>
  