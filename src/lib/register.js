import Database from 'better-sqlite3'

export let register = (username,email,password,regdate)=> {
    const db = new Database('./src/lib/my.db', {verbose: console.log});
    try{
        console.log(username,password,email,regdate);
        db.prepare("INSERT INTO users (username,email,password,regdate) values(?,?,?,?)").run(username,email,password,regdate);
        db.close();
        return 0;
    }catch(e){
        console.log(e)
        db.close();
        return -1;
    }
}
