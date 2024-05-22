//  server/routes/images/[name].js   http://localhost:3000/images/logo.png

import fs from "fs";
import path from 'path'
export default defineEventHandler(async (event) => {
    if (event.node.req.url == '/images/undefined') return event;
    let dest = ''
    if (process.env.NODE_ENV == 'production') dest = '.output/public/images';
    let filePath = path.join(dest, event.context.params.name);
    // return URL.createObjectURL(fs.createReadStream(filePath)) 
    return sendStream(event, fs.createReadStream(filePath));
});