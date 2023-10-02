import Database from 'better-sqlite3'
export let getuserdetails = async(sessionid)=> {
    const db = new Database('./src/lib/my.db', {verbose: console.log});
    const query = db.prepare("SELECT * from session where sessionid=(?)")
    const result = query.get(sessionid)
    const q2 = db.prepare("SELECT * from users WHERE email=(?)")
    const r2 = q2.get(result.user)
    db.close();
    return r2;
}
