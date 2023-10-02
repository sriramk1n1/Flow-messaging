import Database from 'better-sqlite3'
import bcrypt from 'bcrypt'
import { redirect } from '@sveltejs/kit';

export let verifyuser = async(email,password)=> {
    const db = new Database('./src/lib/my.db', {verbose: console.log});
    const q = db.prepare("SELECT * from users WHERE email=(?)");
    let resultt;
    try{
      const result = await q.get(email)
      resultt =  await bcrypt.compare(password,result.password);
    }catch(e){
    }
    db.close()
    if (resultt) return resultt;
    else return false;
  }
