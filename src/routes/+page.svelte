<script>
	import { enhance } from "$app/forms";
	import { onMount } from "svelte";
	export let data;
	export let form;
	let ws;
	let conversation;
	let sender = data.res.email;
	let receiver;
	let mobileview=false;
	
	onMount(()=>{
		ws = new WebSocket('ws:localhost:9000');
		ws.onmessage = (event) => {
      	console.log(event.data);
		conversation = JSON.parse(event.data);
		scrollBodyToBottom();
    };
	window.addEventListener("beforeunload", function () {
		if(ws.readyState == WebSocket.OPEN)
        ws.close();
	});
});
function scrollBodyToBottom() {
	document.documentElement.scrollTo(0,document.body.scrollHeight)
}
let func4 = (e) => {
		mobileview=!mobileview;
		

	}
	$: data.convlist = form?.convlist ? form.convlist : data.convlist;

</script>
<div class="body-container">
	<div class="sidebar">
		<div class="input-container" style="padding:10px">
			<form method="post" use:enhance action="?/adduser">
				<input type="text" class="modern-input" placeholder="Add users..." name=adduser>
			</form>
		</div>	
		<div class="conversations" style="padding: 10px;">

			{#each data?.convlist || [] as obj}
				<div class="chat-list" class:selected={receiver == obj.receiver}>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="chat-item" on:click={()=>{
						receiver=obj.receiver;
						ws.send(JSON.stringify({receiver,sender}));
					}
					} >
					  <div class="user-avatar">
					  </div>
					  <div class="user-info">
						<p class="user-name">{obj.receiver}</p>
						<p class="last-message">Hello there!</p>
					  </div>
					</div>
				</div>
			{/each}
		</div>		
	</div>
	<div class="mobile" class:mobilemenu={mobileview} class:mobilemenuhidden={mobileview}>
		<div class="msidebar">
			<div class="input-container" style="padding:10px; width:100%">
				<form method="post" use:enhance action="?/adduser">
					<input type="text" style="width:100%" class="modern-input" placeholder="Add users..." name=adduser>
				</form>
			</div>	
			<div class="conversations" style="padding: 10px">
	
				{#each data?.convlist || [] as obj}
					<div class="chat-list" >
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="chat-item" on:click={()=>{
							receiver=obj.receiver;
							ws.send(JSON.stringify({receiver,sender}));
							func4();
						}
						} class:selected={receiver == obj.receiver}>
						  <div class="user-avatar">
							<!-- <img src="user-avatar.jpg" alt="User Avatar"> -->
						  </div>
						  <div class="user-info">
							<p class="user-name">{obj.receiver}</p>
							<p class="last-message">Hello there!</p>
						  </div>
						</div>
					</div>
				{/each}
			</div>		
		</div>
	</div>
		
	<div class="content" class:c2={!mobileview}>

				<div class="topbar" >
					<div class="mobiletoggle" >
						<img width=20px height=20px src="menu.png" on:click={func4}>
					</div>

					<div style="flex:4; text-align:center ">
						{receiver || ""}
					</div>
					<div>
						<a href="/logout"> Logout </a>
					</div>
				</div>
				<div class="messages" id="myele">

					{#each conversation || [] as obj}
					{#if obj.sender==sender}
					<div class="Component" style=" margin: 10px; width: auto; height: auto; padding-top: 10px; padding-bottom: 20px; padding-left: 60px; padding-right: 60px; background: #DFF4F9; border-top-left-radius: 80px; border-top-right-radius: 20px; border-bottom-right-radius: 80px; border-bottom-left-radius: 80px;">
						<div class="Component" style="color: #10363F; font-size: 18px; font-family: DM Sans; font-weight: 700;  word-wrap: break-word">{obj.message}</div>
					</div>
					{:else}
					<div class="Properties" style="margin: 10px; width: auto; height: auto; padding-top: 10px; padding-bottom: 20px; padding-left: 60px; padding-right: 60px; align-self:flex-start; background: #FBC8C4; border-top-left-radius: 20px; border-top-right-radius: 80px; border-bottom-right-radius: 80px; border-bottom-left-radius: 80px;">
						<div class="Properties" style="text-align: center; color: #700B0B; font-size: 18px; font-family: DM Sans; font-weight: 700;  word-wrap: break-word">{obj.message}</div>
					</div>
					{/if}
					{/each}
					
				</div>
			<div class="footer">

				<form class="form2"
							method="post"
							use:enhance={({
								formElement,
								formData,
								action,
								cancel,
								submitter,
							}) => {
								// `formElement` is this `<form>` element
								formData.set("receiver", receiver);
								// `formData` is its `FormData` object that's about to be submitted
								// `action` is the URL to which the form is posted
								// calling `cancel()` will prevent the submission
								// `submitter` is the `HTMLElement` that caused the form to be submitted
			
								return async ({ result, update }) => {
									// `result` is an `ActionResult` object
									update();
									ws.send(JSON.stringify({receiver,sender}));
							

	
									// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
								};
							}}
							action="?/message">
							<div class="espace"></div>
				<input type="text" class="modern-input2" placeholder="Type your message..." name="message">
				<div class="rightspace">
					<button class="send-button" type="submit" >Send</button>
				</div>
				
			</form>
			</div>		
	</div>
</div>
<!-- <h3> <a href="/logout">Logout </a> </h3>
<div>
	You are {data.res.username}
</div>
<div>
	Your email is {data.res.email} -->
<!-- </div> -->

<style>
.body-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
}	
.selected{
	border: 1px solid #6d00ff;
}
.sidebar {
	background-color:aliceblue;
  flex: 5;
  flex-grow: 1;
  border-radius: 10px;
  position: fixed;
  height: 100vh;
}
.footer{
	position: fixed;
	display: absolute;
	bottom:0px;
	width:auto;  display:absolute; right:0px; left:220px;
	background-color: white;
}
.input-container{
	flex:2
}
.conversations {
	flex:10;
}
.content {
  flex: 8;
  display: flex;
  flex-direction: column;
  
}

.topbar{
	flex: 1;
	background-color:aliceblue;
	display: flex;
	padding: 20px;
	position:fixed; width:auto;  display:absolute; right:0px; left:220px;
	z-index: 1;
}
.messages{
	flex:10;
	display: flex;
	flex-direction: column;
	justify-content:baseline;
	align-items: end;
	margin-top: 10vh;
	margin-bottom: 10vh;
	position: absolute;
	left:220px;
	right: 0px;
	overflow: hidden;
	padding: 10px;
}



.form2{
	flex: 1;
	display: flex;
}
.modern-input {

  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.modern-input:focus {
  border-color: #007bff;
}

.espace{
	flex:2;
}
.modern-input2 {

  flex: 8;
  margin: 10px;
  min-width: 60%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.modern-input2:focus {
  border-color: #007bff;
}
.rightspace{
	flex:2;
	position: relative;
}
.send-button {
	position: absolute;
	margin: 10px;
	top: 0;
	bottom: 0;
	width: 100px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}



:global(*){
        box-sizing : border-box;
        margin: 0;
        padding: 0;
    }



.chat-list {
  margin-top: 5px; 
  padding: 10px; 
  background-color: #fff; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
}


.mobile{
	display:none;
}
.msidebar{
	display:none;
}
.mobilemenu{
	display: none;
}
.mobiletoggle{
	display: none;
}


@media (max-width: 1026px) {
	.messages{
		left:0px;
	}
	.espace{
		display: none;
	}
	.rightspace{
		flex:4;
		position: relative;
	}
	.modern-input2 {

		flex: 8;
		margin: 10px;
		min-width: 40%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 10px;
		font-size: 16px;
		outline: none;
		transition: border-color 0.3s;
		}
	.send-button {
		position: absolute;
		margin: 10px;
		top: 0;
		bottom: 0;
		width: 80px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 10px;
		padding: 10px 20px;
		cursor: pointer;
}
	.topbar{
		left:0px;
	}
	.footer{
		left:0px;
		align-items: center;
	}
	.c2{
	display: none;
}
    .sidebar {
        display: none;
    }
	.mobile{
	display:block;
	width: 100%;
	padding: 20px;
}
.msidebar{
	display:block;
}
.mobilemenu{
	display: block;
	width: 100%;

}
.mobilemenuhidden{
	display:none;
}
.mobiletoggle{
	display: block;
	float: left;
}

    }

</style>
