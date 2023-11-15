import { v4 as uuidv4 } from 'uuid'
import { createConnection } from 'mysql2';


export let createsession = async(user)=> {
    const con = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'l',
        database: 'messaging_app',
    })
    const sessionid = uuidv4();
    con.execute("INSERT INTO Session values (?,?)",[sessionid,user]);
    con.end();
    return sessionid;
}