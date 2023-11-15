import { fail, redirect } from '@sveltejs/kit';
import { createConnection } from 'mysql2';
import { getuserdetails } from '../lib/getuserfromsession';

export const load = async({ request, cookies }) => {
	if (!cookies.get("access")) {
		throw redirect(307, '/login');
	}else{

		
		const con = createConnection({
			host: 'localhost',
			user: 'root',
			password: 'l',
			database: 'messaging_app',
		})
		const res = await getuserdetails(cookies.get("session"))
		const r4 = await con.promise().execute("SELECT Receiver from Hadconversationswith where Sender=(?)",[res.UserEmail]).then((res)=>{return res[0]});

		return {
			res,
			convlist: r4
		}
	}
}

export const actions = {
	adduser: async({request,cookies}) => {
		const con = createConnection({
			host: 'localhost',
			user: 'root',
			password: 'l',
			database: 'messaging_app',
		})
		const userfrom = await con.promise().execute("SELECT UserEmail FROM Session WHERE SessionId=(?)",[cookies.get("session")]).then((res)=>{return res[0][0].UserEmail})
		const r2 = await request.formData();
		const userto = r2.get("adduser");
		try{
			const r4 = await con.promise().execute("SELECT Receiver from Hadconversationswith where Sender=(?)",[userfrom]).then((res)=>{return res[0]});
			console.log('r4',r4);
			let flag=false;
			r4.forEach((obj)=>{
				if (obj.Receiver===userto) {
					flag=true;
				}
			});
			console.log(flag)
			if (!flag){
				await con.promise().execute("INSERT INTO Hadconversationswith VALUES (?,?)",[userfrom,userto]);
			}else{
				return;
			}
			console.log("herreee")
			const convs= await con.promise().execute("SELECT Receiver FROM Hadconversationswith WHERE Sender=(?)",[userfrom]).then((res)=>{return res[0]});
			return {
				success: true,
				convlist: convs
			}
		}catch(e){
			console.log(e);
			return fail(400,{
				success: false,
				message: "User does not exist"
			});
		}
		
	},
	message: async({request,cookies}) => {
		const t = await request.formData();
		const message = t.get("message");
		console.log("RECEIIIIIIIIIIIIIIVED ",message)
		const receiver = t.get("receiver");
		const t1 = await getuserdetails(cookies.get("session"));
		console.log(t1,'t1')
		const sender = t1.UserEmail;
		const con = createConnection({
			host: 'localhost',
			user: 'root',
			password: 'l',
			database: 'messaging_app',
		})
		await con.promise().execute("INSERT INTO Conversation (Sender,Receiver,Timestamp,Message) values (?,?,?,?)",[sender,receiver,new Date().toISOString().slice(0, 19).replace('T', ' '),message]);
		
		return {
			status:"sent",
			message:message,
			receiver:receiver
		};
	}
};