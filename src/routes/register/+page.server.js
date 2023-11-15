import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { RECAPTCHA_SECRET } from "$env/static/private"
import { register } from '../../lib/register';

export const actions = {   
    register: async ({request}) => {
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
        body: `secret=${RECAPTCHA_SECRET}&response=${data.get('g-recaptcha-response')}`
    };

    let captcha_ver_response = await fetch( 'https://www.google.com/recaptcha/api/siteverify', options );
    captcha_ver_response = await captcha_ver_response.json();

    console.log(captcha_ver_response)
    if(captcha_ver_response.success==false){
        console.log('here')
        return fail(400,{ 
            success: false,
            message: "Captcha is failed, please attempt again." 
        });
    }     
        const plainPassword = data.get("password"); 
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 
        console.log(1)
        const res = await register(data.get("username"),data.get("email"),hashedPassword,new Date().toISOString().slice(0, 19).replace('T', ' '));
        console.log(2)
        return {
            success: res===0?true:false, 
            message: res==0?"Registered successfully, You can login now.":"User already exists", 
        } 
    },
  
  
};
