import { register } from '$lib/register';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {   
    default: async ({request}) => {
        let data = await request.formData();  
        
        if (!data.get("username")){
          return fail(400,{
            success:false,
            message: "Enter user name"
          })
        }
       
        if (!data.get("email")){
          return fail(400,{
            success:false,
            message: "Enter email"
          })
        }
        if (data.get("password").length<4){
          return fail(400,{
            success:false,
            message: "Enter password greater than 4 characters"
          })
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
        body: `secret=${"6Lf8s84oAAAAABaWgzstAy6RS8PvWZShf9VxWqHJ"}&response=${data.get('g-recaptcha-response')}`
    };

    let captcha_ver_response = await fetch( 'https://www.google.com/recaptcha/api/siteverify', options );
    captcha_ver_response = await captcha_ver_response.json();
    if(captcha_ver_response.success==false){
        console.log('here')
        return fail(400,{ 
            success: false,
            message: "Captcha is failed, please attempt again." 
        });
    }     
        const plainPassword = data.get("password"); 
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 
        const res = await register(data.get("username"),data.get("email"),hashedPassword,new Date().toLocaleString());
        return {
            success: res===0?true:false, 
            message: res==0?"Registered successfully, You can login now.":"User already exists", 
        } 
    }  
};
