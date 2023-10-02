import Database from 'better-sqlite3'
export let deleteallrows = async()=> {
    const db = new Database('my.db', {verbose: console.log});
    db.prepare("DELETE from users").run()
    db.close();
    console.log("deleted all entries")
}
deleteallrows();