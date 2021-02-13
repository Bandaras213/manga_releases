const fs = require('fs');

async function jsonload(name) {
let ret
if(!fs.existsSync(`${name}.json`)) {
  console.log("File not found. Creating new one");
  await fs.promises.writeFile(`${name}.json`, '{}')
  ret = await JSON.parse(fs.readFileSync(`${name}.json`, "utf8"));
}else {
  ret = await JSON.parse(fs.readFileSync(`${name}.json`, "utf8"));
}
return ret
}

async function writejson(data, name) {
  await fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
    if (err) {
      console.log("Error writing file", err);
      } else {
      console.log("Successfully wrote file");
      }
    });
  }


async function checkdbkeys(key, bookdb) {
  let retvalue
  if (Object.keys(key).length == 1) {
  retvalue = bookdb[key.month]
  } else {
    retvalue = bookdb[key.month][key.datatemp]
  }
  return {retvalue, bookdb}
}


module.exports = {
  loadjson: async function(name) {
    let a1 = await jsonload(name);
    return a1;
  },
  writejson: async function(bookdb, dbname) {
    let a1 = await writejson(bookdb, dbname);
  },
  checkdbkeys: async function(key, bookdb) {
    let a1 = await checkdbkeys(key, bookdb);
    return a1;
  }
};