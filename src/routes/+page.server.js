import { fail, redirect } from '@sveltejs/kit';
import Database from 'better-sqlite3';
import { getuserdetails } from '../lib/getuserfromsession';
export const load = async({ request, cookies }) => {
	if (!cookies.get("access")) {
		throw redirect(307, '/login');
	}else{
		const db = new Database('src/lib/my.db',{verbose:console.log});
		const res = await getuserdetails(cookies.get("session"))
		const r3 = db.prepare("SELECT receiver from hadconversationswith where sender=(?)");
		const r4 = r3.all(res.email);
		return {
			res,
			convlist: r4
		}
	}
}

export const actions = {
	adduser: async({request,cookies}) => {
		const db = new Database('src/lib/my.db',{verbose:console.log});
		const r1 = db.prepare('SELECT user FROM session WHERE sessionid=(?)');
		const userfrom = r1.get(cookies.get("session")).user;
		const r2 = await request.formData();
		const userto = r2.get("adduser");
		try{
			const r3 = db.prepare("SELECT receiver from hadconversationswith where sender=(?)");
			const r4 = r3.all(userfrom);
			let flag=false;
			r4.forEach((obj)=>{
				if (obj.receiver===userto) {
					flag=true;
				}
			});
			console.log(flag)
			if (!flag){
				db.prepare("INSERT INTO hadconversationswith (sender,receiver) VALUES (?,?)").run(userfrom,userto);
			}else{
				return;
			}
			return {
				convlist: db.prepare("SELECT receiver FROM hadconversationswith WHERE sender=(?)").all(userfrom)
			}
		}catch(e){
			console.log(e);
			return fail(400,{
				message: "User does not exist"
			});
		}
		
	},
	message: async({request,cookies}) => {
		const t = await request.formData();
		const message = t.get("message");
		const receiver = t.get("receiver");
		const t1 = await getuserdetails(cookies.get("session"));
		const sender = t1.email;
		const db = new Database('src/lib/my.db',{verbose:console.log});
		const r1 = db.prepare('INSERT INTO conversations (sender,receiver,timestamp,message) values (?,?,?,?)');
		r1.run(sender,receiver,new Date().toLocaleString(),message)
		return{
			status:"sent",
			message:message,
			receiver:receiver
		};
	}
};