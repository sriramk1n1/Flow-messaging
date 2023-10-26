import { fail, redirect } from "@sveltejs/kit";
import { verifyuser } from "$lib/verify";
import { createsession } from "$lib/createsession";

export const actions = {   
    default: async ({request, cookies}) => {
        let data = await request.formData();
        console.log(data)

        if (!data.get("email")){
            return fail(400,{
                    success: false,
                    message: "Please enter email"
                });
        }

        if(data.get("g-recaptcha-response")==""){
            return fail(400,{
                success: false,
                message: "Please attempt captcha"
            });
        }

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${""}&response=${data.get('g-recaptcha-response')}`
        };

        let captcha_ver_response = await fetch( 'https://www.google.com/recaptcha/api/siteverify', options );
        captcha_ver_response = await captcha_ver_response.json();
        if(captcha_ver_response.success==false){
            console.log('here')
            return fail(400,{ 
                success: false,
                message: "Captcha is failed, please attempt again." 
            });
        }                // Do something with response.


        if (await verifyuser(data.get("email"),data.get("password"))){
            const sessionid = await createsession(data.get("email"));
            cookies.set("access","true",{ maxAge : 604800});
            cookies.set("session",sessionid,{ maxAge : 604800})
            throw redirect(303,"/");
        }
        else{
            return fail(400,{ 
                message: "Please enter valid details" 
            });
        }
    }    
};
