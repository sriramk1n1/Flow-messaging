<script>
	import { enhance } from '$app/forms';
    export let form;
    $: console.log(form)
</script>

<div style="display: flex; justify-content:center">
    <h3> Register </h3>
</div>
<div class="container" id="new">
    {#if form?.success==true}
       <p style="color:green">{form?.message || ""}</p>
    {:else if form?.success==false}
        <p style="color:red">{form?.message || ""}</p>
    {/if}
    <form method="POST" use:enhance>
        <div class="in">
            <input type="text" placeholder="name" name="username" value={form?.username || ""}>
        </div>
        <div class="in">
            <input type="email" placeholder="email" name="email" value={form?.email || ""}>
        </div>
        <div class="in">
            <input type="password" placeholder="password" name="password" >
        </div>
        <div class="in">
            <button type="submit"> Register </button>
            <button><a href="/login">Existing user?</a></button>
        </div>
    </form>
</div>


<style>
    .container {
        display: flex;
        justify-content: center;
    }
    .in{
        margin: 20px;
    }
</style>