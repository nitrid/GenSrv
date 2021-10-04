import server from 'gensrv'
import config from './config.js'
import fs from 'fs'
import path from 'path'

let gensrv = new server.default(config);
gensrv.listen(80);