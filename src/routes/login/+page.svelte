<script>
	import { enhance } from '$app/forms';
    export let form;
    $: console.log(form)
    
</script>

<div class="Desktop1" style="width: 100%; height: 100%; position: relative; background: white">
    
    <div class="Digital" style="left: 86px; top: 86px; position: absolute; color: #3751FE; font-size: 30px; font-family: Roboto; font-weight: 700; word-wrap: break-word">Flow Messaging.</div>
    <div class="WelcomeBackPleaseLoginToYourAccount" style="left: 86px; top: 20vh; position: absolute; color: rgba(0, 0, 0, 0.60); font-size: 18px; font-family: Roboto; font-weight: 400; word-wrap: break-word">Welcome  back! Please login to your account.</div>
    <form method="POST" use:enhance={() => {
        return async ({ update }) => {
            update();
            window.grecaptcha.reset();
        };
    }}>
        
        <div class="Rectangle1" style="min-width: 400px; width:35%; height: 74px; left:89px; top: 240px; position:absolute; background: white; border: 1px #C1BBBB solid">
            <div class="EmailAddress" style="padding-top:10px; padding-left:20px; color: rgba(0, 0, 0, 0.61); font-size: 18px; font-family: Roboto; font-weight: 400; word-wrap: break-word">Email Address</div>
            <input class="HakeemDigitalCom" style="border:none; min-width: 390px; width:30%; outline:none; height:50%; padding-left:20px; color: #3751FE; font-size: 18px; font-family: Roboto; font-weight: 500; word-wrap: break-word" type="email" name="email" value={form?.email || ""}/>
            <div class="Line2" style="width:74px; position:absolute; top:100%; transform: rotate(-90deg); transform-origin: 0 0; background: #0C31F1; border: 3px #0C31F1 solid"></div>
        </div>
        
        <div class="Rectangle2" style="min-width: 400px; width:35%; height: 74px; left: 89px; top: 346px; position: absolute; background: white; border: 1px #C1BBBB solid">
            <div class="EmailAddress" style="padding-top:10px; padding-left:20px; color: rgba(0, 0, 0, 0.61); font-size: 18px; font-family: Roboto; font-weight: 400; word-wrap: break-word">Password</div>
            <input class="HakeemDigitalCom" style="border:none; min-width: 390px; width:30%;outline:none; height:50%; padding-left:20px; color: #3751FE; font-size: 18px; font-family: Roboto; font-weight: 500; word-wrap: break-word" type="password" name="password"/>
            <div class="Line2" style="width:74px; position:absolute; top:100%; transform: rotate(-90deg); transform-origin: 0 0; background: #0C31F1; border: 3px #0C31F1 solid"></div>
        </div>

        <div class="g-recaptcha" style="left: 70px; top: 426px; position: absolute; 
        padding-top:10px; padding-left:20px;font-size: 18px; font-family: Roboto; font-weight: 400" data-sitekey="6Lf8s84oAAAAAM8QjtjHkfilO1a4KokH-KBsZMuH"> </div>
  
        <div class="Rectangle4" style="text-align:center;  width: 129px; height: 54px; left: 85px; top: 564px; position: absolute; background: #3751FE; box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.25)">
            <button type="submit" class="Login" style="width: 100%; height: 100%; top: 25%; position:relative; background-color: transparent; border:none; margin:0px; top:0px; color: white; font-size: 18px; font-family: Roboto; font-weight: 400; word-wrap: break-word">Login </button>
            </div>

            <div class="Rectangle5" style="text-align:center; width: 129px; height: 54px; left: 247px; top: 564px; position: absolute; background: white; border: 1px #3751FE solid">
                <div class="SignUp" style="width: 100%; height: 100%; top: 25%; position:absolute;color: #0C31F1; font-size: 18px; font-family: Roboto;"><a style="color: #0C31F1; font-size: 18px; font-family: Roboto; text-decoration:none;" href="/register">Sign Up</a></div>
            </div>
            <div class="Rectangle7" style="color:red; width: 500px; height: 54px; left: 89px; top: 204px; position:absolute;">
                {form?.message || ""}
            </div>
        </form>
        <div class="Rectangle6" style="width: 778px; height: 100vh; right: 0px; top: 0px; position: absolute; background: rgba(229, 229, 229, 0.41) margin:0px">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="ClipMessageSent1" style="margin: 0px; width: 100%; height: 99%" src="logo.jpeg" />
            
        </div>
        
        
        
    </div>
<style>

    :global(*){
        box-sizing : border-box;
        margin: 0;
        padding: 0;
    }
    @media (max-width: 1026px) {
    .Rectangle6 {
        display: none;
    }
    }
    
</style>
