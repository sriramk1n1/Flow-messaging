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
        const plainPassword = data.get("password"); 
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 
        const res = await register(data.get("username"),data.get("email"),hashedPassword,new Date().toLocaleString());
        return {
            success: res===0?true:false, 
            message: res==0?"Form submitted successfully":"User already exists", 
        } 
    }  
};
