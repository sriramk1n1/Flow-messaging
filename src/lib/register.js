import { createConnection  } from 'mysql2';
export let register = async (username,email,password,regdate)=> {
    try{
        const con = createConnection({
            host: 'https://chat.skapi.online/db',
            user: 'root',
            password: 'l',
            database: 'messaging_app',
        })
        con.query("INSERT IGNORE INTO User (Username,UserEmail,EmailPassword,RegDate) values (?,?,?,?)",[username,email,password,regdate]);
        con.end();
        return 0;
    }catch(err){
        console.log("Insert failed");
        return -1;
    };
}


