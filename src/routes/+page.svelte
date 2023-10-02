<script>
	import { redirect } from '@sveltejs/kit';
	import { json } from "@sveltejs/kit";
	import { enhance } from '$app/forms';
	export let data;
	export let form;
	let conversation;
	let receiver;
	
	const updateconversation = async() => {
		if ( receiver ){
			console.log(receiver);
			let c = await fetch("http://localhost:5173/conversation",{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Specify the content type as JSON
				},
				body: JSON.stringify({receiver}), // Convert the data object to JSON
			});
			conversation = await c.json();
		}
	}
	setInterval(updateconversation,1000);
	$: data.convlist = form?.convlist?form.convlist:data.convlist;
</script>
<h3> <a href="/logout">Logout </a> </h3>
<div>
	You are {data.res.username}
</div>
<div>
	Your email is {data.res.email}
</div>
<div>

	<form method="post" use:enhance action="?/adduser">
		<input placeholder="Add new user" name="adduser">
		<button type="submit">Add User</button>
	</form>
	<div>List of added Users</div>
	{#each data?.convlist || [] as obj}
	<div><button class:selected={receiver==obj.receiver} on:click={async()=>{
		receiver = obj.receiver;
	}}>{JSON.stringify(obj)}</button><span>{receiver==obj.receiver?"waiting for message":""}</span></div>
	{/each}
</div>
<div>
	Conversations:
</div>
<div>
	With - {receiver}
</div>
{#each conversation || [] as obj}
	<div>
		{JSON.stringify(obj)}
	</div>
{/each}
<div>
	<form method="post" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
			formData.set("receiver",receiver);
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			update();
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}} action="?/message">
		<input placeholder="Enter your message" name="message">
		<button type="submit" on:click={()=>{

		}}> Send </button>
	</form>
</div>
<div>
{#if form?.status}
	<div style="color:green">
		{form?.status} -- {form?.message} to {form?.receiver}
	</div>
{/if}	
</div>

<style>
	.selected {
		border: 3px solid green;
	}
</style>