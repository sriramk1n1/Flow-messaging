import { json, redirect } from "@sveltejs/kit";
import { getuserdetails } from "$lib/getuserfromsession"
import Database from "better-sqlite3";
export async function POST({request, cookies}) {
    console.log("HEREE")
    const a = await request.json();
    let email = a.receiver;
    let r =await getuserdetails(cookies.get("session"))
    let femail = r.email;
    console.log(email, femail);
    const db = new Database('src/lib/my.db');
    const query = `
        SELECT *
        FROM conversations
        WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
        ORDER BY timestamp
    `;
    const q = db.prepare(query);
    const result = q.all(femail,email,email,femail);
    // console.log(result)
    return json(result);
}

