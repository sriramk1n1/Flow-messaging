import { redirect } from "@sveltejs/kit";

export const actions = {   
    default: async ({request, cookies}) => {
        let data = await request.formData();
        if (data.get("email")===dataog.user && data.get("password")===dataog.password){
            cookies.set("access","true");
            throw redirect(302,"/");
        }
    }    
};
let dataog = {
    user: "sriramjkini@gmail.com",
    password: "234"
}