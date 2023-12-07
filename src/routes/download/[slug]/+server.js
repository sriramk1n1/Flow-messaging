import { createConnection } from 'mysql2';

export async function GET({ request, params }) {
    const cid=params.slug


    const con = createConnection({
        host: 'https://flow.skapi.online/db',
        user: 'root',
        password: 'l',
        database: 'messaging_app',
    })
    const file = await con.promise().execute("SELECT File,Name FROM Documents WHERE CId=(?)",[cid]);
    let buf = await file[0][0].File
    // buf = new TextDecoder().decode(buf);
    const filename = await file[0][0].Name
    con.end();
    return new Response(buf,{
        headers: {
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Type': 'text/plain',
        },
    });
}