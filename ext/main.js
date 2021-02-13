const exttokyopop = require('./tokyopop.js')
/*const extkaze = require('./kaze.js')
const extaltraverse = require('./altraverse.js')
const extmangacult = require('./mangacult.js')
const extcarlsenmanga = require('./carlsenmanga.js')
const extegmont = require('./egmont.js')*/

async function sortswitch(bookdb, url, name) {
let ret
switch(name) {
case "tokyopop":
ret = await exttokyopop.data(bookdb, url, name)
break
}
return ret
}

module.exports = {
  sorter: async function(bookdb, url, name) {
    let a1 = await sortswitch(bookdb, url, name);
    return a1;
  }
};