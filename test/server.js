import server from '../index.js'
import config from './config.js'
import fs from 'fs'
import path from 'path'
import download from 'download-git-repo'

let gensrv = new server.default(config);
gensrv.listen(config.port);