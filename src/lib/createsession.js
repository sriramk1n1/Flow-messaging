import Database from 'better-sqlite3'
import { v4 as uuidv4 } from 'uuid'
export let createsession = async(user)=> {
    const db = new Database('./src/lib/my.db', {verbose: console.log});
    const query = db.prepare("INSERT INTO session (sessionid,user) values(?,?)");
    const sessionid = uuidv4();
    console.log(sessionid);
    query.run(sessionid,user);
    db.close();
    return sessionid;
}