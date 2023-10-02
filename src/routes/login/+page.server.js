import { fail, redirect } from "@sveltejs/kit";
import { verifyuser } from "$lib/verify";
import { createsession } from "$lib/createsession";

export const actions = {   
    default: async ({request, cookies}) => {
        let data = await request.formData();
        if (!data.get("email")){
            return fail(400,{
                    success: false,
                    message: "Please enter email"
                });
        }

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
