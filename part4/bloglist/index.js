const http = require('http')
const {PORT} = require("./utils/config")
const app = require("./app");
const {info} = require("./utils/logger");

const server = http.createServer(app);

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})