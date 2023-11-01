const WebSocket = require('ws');
const Database = require("better-sqlite3");
const http = require('http');

const clients = new Map();

function parseCookies(cookieHeader) {
	  const cookies = {};
	  if (cookieHeader) {
		      const cookieStrings = cookieHeader.split(';');
		      for (const cookieString of cookieStrings) {
			            const [name, value] = cookieString.trim().split('=');
			            cookies[name] = decodeURIComponent(value);
			          }
		    }
	  return cookies;
}

const server = http.createServer((req, res) => {
	  console.log(clients)
	    const cookies = parseCookies(req.headers.cookie)
	    console.log(cookies)
	    if(cookies.access){
		          console.log("access granted")
		          const wss = new WebSocket.Server({ server });
		          wss.on('connection', (ws) => {
				          console.log('Client connected');
				          const db = new Database('src/lib/my.db');
				          let senderid;
				          ws.on('message', (message) => {
						            console.log(`Received message: ${message}`);
						            let {sender,receiver} = JSON.parse(message);
						            senderid = sender;
						            clients.set(sender,ws);
						            const query = `
							                  SELECT *
									                FROM conversations
											              WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
												                    ORDER BY cid
														              `;
						            const q = db.prepare(query);
						            const result = q.all(sender,receiver,receiver,sender);
						            ws.send(JSON.stringify(result));
						            console.log("SENT MESSAGE TO SENDER")
						            console.log(clients.has(receiver));
						            if (clients.get(receiver)){
								                let wsss = clients.get(receiver);
								                console.log(wsss);
								                wsss.send(JSON.stringify(result));
								                console.log("SENT MESSAGE TO RECEIVER")
								              }
						            console.log(clients.keys())
						          });

				         ws.on('close', () => {
						         console.log('Client disconnected');
						         clients.delete(senderid);
						         });
				      });
		        res.writeHead(200, { 'Content-Type': 'text/plain' });
		        res.end('HTTP server works!\n');
		      }else{
			          res.writeHead(403, { 'Content-Type': 'text/plain' });
			          res.end('Access denied\n');
			        }
});
setInterval(()=>{console.log(clients.keys())},1000);
server.listen(9000);

// const server = new WebSocket.Server({ port: 9000 });
//
//
// // });
//
