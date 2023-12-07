import { createConnection } from "mysql2";
export let getuserdetails = async(sessionid)=> {
    const con = createConnection({
        host: 'https://flow.skapi.online/db',
        user: 'root',
        password: 'l',
        database: 'messaging_app',
    })
    let result;
    result = await con.promise().execute("SELECT * from Session where SessionId=(?)",[sessionid]).then((res)=>{
        return res[0][0];
    });
    console.log(result)
    result = await con.promise().execute("SELECT * from User where UserEmail=(?)",[result.UserEmail]).then((res)=>{
        return res[0][0];
    });
    console.log(result)
    con.end();
    return result;
}
