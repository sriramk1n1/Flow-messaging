import Database from 'better-sqlite3'
import { get } from 'svelte/store';

let createusertable = () => {
    const db = new Database('my.db', {verbose: console.log});
    db.exec("CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL,password TEXT NOT NULL,email TEXT NOT NULL PRIMARY KEY,regdate TEXT NOT NULL)");
    db.close();
}

let createsessiontable = () => {
    const db = new Database('my.db', {verbose: console.log});
    db.exec("CREATE TABLE IF NOT EXISTS session (sessionid TEXT NOT NULL PRIMARY KEY, user TEXT, FOREIGN KEY (user) references users(email) ON DELETE CASCADE ON UPDATE CASCADE)");
    db.close();
}


let createconversation = () => {
    const db = new Database('my.db',{verbose:console.log});
    db.exec("CREATE TABLE conversations (cid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, sender TEXT, receiver TEXT, timestamp TEXT, message TEXT, FOREIGN KEY(sender) references users(email) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(receiver) references users(email) ON DELETE CASCADE ON UPDATE CASCADE)")
    db.close()
}


let createhadconversationwith = () => {
    const db = new Database('my.db',{verbose:console.log});
    db.exec("CREATE TABLE hadconversationswith (sender TEXT, receiver TEXT, FOREIGN KEY(sender) references users(email) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(receiver) references users(email) ON DELETE CASCADE ON UPDATE CASCADE)")
    db.close()
}


let getdbdetails = () => {
    const db = new Database('my.db',{verbose:console.log});
    
    const res = db.prepare("SELECT * FROM sqlite_master WHERE type='table'");
    console.log(res.all())
    db.close()
}



const deleteall = () => {
    const db= new Database('my.db', {verbose: console.log});
    // db.exec("DELETE from users")
    // db.exec("DELETE from hadconversationswith")
    db.exec("DELETE from conversations")
    // db.exec("DELETE from session")
    db.close()
}


deleteall();