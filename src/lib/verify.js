import bcrypt from 'bcrypt'
import { createConnection } from 'mysql2';

export let verifyuser = async(email,password)=> {
    const con = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'l',
    database: 'messaging_app',
    })
    console.log(email)
    try{
      let result;
      result = await con.promise().execute("SELECT * FROM User WHERE UserEmail=(?)",[email]).then((res)=>{return res[0][0]});
      console.log(result,"res")
      let verified =  await bcrypt.compare(password,result.EmailPassword);
      con.end();
      if (verified) return true;
      else return false;
    }catch(e){
    }
  }
