const fs=require('fs');
const sqlConfig=JSON.parse(fs.readFileSync('./config.json')).sql;

export {
    sqlConfig
}