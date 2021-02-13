const util = require('./util.js');
const extention = require('./ext/main.js')

/* kaze(https://www.kaze-online.de/news/artikel/manga-vorschau-januar-2021/)
has to spoof array with months like altraverse
has no images in list
has prices (extra fetch with images together)
has name and Vol number with prefix but has extra on back ((auch als E-Book))
*/

/* altraverse(https://altraverse.de/termine/)
fetch all news links or make array for months (https://altraverse.de/termine/{monthname}-neuheiten)
has no images in list (extra fetch or ignore)
has prices
has name and Vol number with prefix same as tokyopop
*/

/* mangacult(https://www.cross-cult.de/id-2021.html)
whole list of one year in one page
has no images in list (extra fetch or ignore)
has prices
has name and Vol number no Prefix
*/

/* carlsenmanga(https://www.carlsen.de/manga/monatsuebersicht)
only has 15 manga on display (has to fetch links first)
has images
has prices
has name and Vol number no Prefix
*/

/* egmont(https://www.egmont-shop.de/manga/?PublicationYear=2021&collapsedFacets=&maxPrice=31&minPrice=0&orderOption=0&pageNumber=1)

change year auto maybe?
pageNumber == (Max Manga / 30)
has images
has prices
has name and Vol number no Prefix
*/

let urls = {"tokyopop": "https://www.tokyopop.de/kalender/", "kaze": "https://www.kaze-online.de/news/artikel/manga-vorschau-januar-2021/", "altraverse": "https://altraverse.de/termine/", "mangacult": "https://www.cross-cult.de/id-2021.html", "carlsenmanga": "https://www.carlsen.de/manga/monatsuebersicht", "egmont": "https://www.egmont-shop.de/manga/?PublicationYear=2021&collapsedFacets=&maxPrice=31&minPrice=0&orderOption=0&pageNumber=1"}

async function start() {
for (let i = 0; i < (/*Object.keys(urls).length*/1); i++) {
let bookdb = await util.loadjson(Object.keys(urls)[i])
let getdata = await extention.sorter(bookdb, urls[Object.keys(urls)[i]], Object.keys(urls)[i]);
if (getdata.undefinedcounter != 0) {
    await util.writejson(getdata.bookdb, getdata.dbname)
  }
}
}
start()