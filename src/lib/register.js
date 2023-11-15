import { createConnection  } from 'mysql2';
export let register = async (username,email,password,regdate)=> {
    try{
        const con = createConnection({
            host: 'localhost',
            user: 'root',
            password: 'l',
            database: 'messaging_app',
        })
        con.execute("INSERT INTO User (Username,UserEmail,EmailPassword,RegDate) values (?,?,?,?)",[username,email,password,regdate],(err,res)=>console.log(err,res));
        con.end();
        return 0;
    }catch(e){
        console.log(e)
        db.close();
        return -1;
    }
}


