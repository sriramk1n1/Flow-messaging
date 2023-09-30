<script>
	import { enhance } from '$app/forms';
</script>

<div style="display: flex; justify-content:center">
    <h3> Login </h3>
</div>
<div class="container">
    <form method="POST" use:enhance>
        <div class="in">
            <input type="email" placeholder="email" name="email">
        </div>
        <div class="in">
            <input type="password" placeholder="password" name="password">
        </div>
        <div class="in">
            <button type="submit"> Login </button>
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