import server from '../index.js'
import config from './config.js'

let gensrv = new server(config);
gensrv.listen(80);
