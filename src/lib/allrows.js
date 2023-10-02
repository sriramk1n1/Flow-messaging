import Database from 'better-sqlite3'
export let allrows = async()=> {
    const db = new Database('./src/lib/my.db', {verbose: console.log});
    console.log(db)
    const result = db.prepare("SELECT * from users").all()
    db.close();
    console.log(result)
    return result;
}
