const fs = require("fs");
const path = require("path");
const ServerMock = require("mock-http-server");

const server = new ServerMock({ host: "0.0.0.0", port: 9000 });

// Mock returning player stats
server.on({
  method: "GET",
  path: '/headtohead.json',
  reply: {
    status: 200,
    headers: { "content-type": "application/json" },
    body: fs.readFileSync(path.join(__dirname, 'headtohead.json'), 'utf8')
  }
});

server.start(() => {
  console.log("mock server started");
});
