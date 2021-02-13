const util = require('../util.js');
const axios = require("axios");
const cheerio = require("cheerio");

let undefinedcounter = 0;

async function getmangadata(bookdb, url, dbname) {
  let links = [];
  let titles = [];
  await axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const urlElems = $("div.framemenu--list");
    const nextelm = $(urlElems).find("div.framemenu--list-item")

    for (let i = 0; i < (nextelm.length - 1); i++) {
      links.push($(nextelm[i]).find("a")[0].attribs.href)
      titles.push($(nextelm[i]).find("a")[0].attribs.title)
    }
  })
  return linktest(links, titles, bookdb, dbname)
}

async function linktest(links, titles, bookdb, dbname) {
  let data = [];

  for (const [index, url] of links.entries()) {

  await axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const urlElems = $("div.listing");
    const nextelm = $(urlElems).find("div.product--box")
    for (let i = 0; i < (nextelm.length); i++) {
      let mainimgcont = $(nextelm[i]).find("span.image--media")[0]
      let imgs = $(mainimgcont).find("img")[0].attribs.srcset
      let link = $(nextelm[i]).find("a.product--title")[0].attribs.href
      let fulltitle = $(nextelm[i]).find("a.product--title")[0].attribs.title
      let pricecont = $(nextelm[i]).find("span.price--default")[0]
      let price = $(pricecont).text().replace(/(\r\n|\n|\r|\*)/gm, "")

      data.push(fulltitle, price, imgs, link)
    }
  })

    let month = titles[index].replace("Veröffentlichungen im ", '')
    let checkmonth = await util.checkdbkeys({month}, bookdb)
    bookdb = checkmonth.bookdb
      if (checkmonth.retvalue == undefined) {
          bookdb[month] = {}
        }
    for (let ii = 0; ii < (data.length); ii += 4) {
    let datatemp = data[ii].replace(/,/g, '').replace(/ /g, '')
    let checkkey = await util.checkdbkeys({month, datatemp}, bookdb)
    bookdb = checkkey.bookdb
    if (checkkey.retvalue == undefined) {
      bookdb[month][datatemp] = {"title": data[ii], "price": data[ii + 1], "img": data[ii + 2], "href": data[ii + 3]}
      undefinedcounter++
    } else {
      if (bookdb[month][datatemp].title == undefined) {
        bookdb[month][datatemp].title = data[ii]
        undefinedcounter++
      } else if (bookdb[month][datatemp].price == undefined) {
        bookdb[month][datatemp].price = data[ii + 1]
        undefinedcounter++
      } else if (bookdb[month][datatemp].img == undefined) {
        bookdb[month][datatemp].img = data[ii + 2]
        undefinedcounter++
      } else if (bookdb[month][datatemp].href == undefined) {
        bookdb[month][datatemp].href = data[ii + 3]
        undefinedcounter++
      }
    }
    }
    data = []
  }
return { bookdb, dbname, undefinedcounter }
}

module.exports = {
  data: async function(bookdb, url, name) {
    let a1 = await getmangadata(bookdb, url, name);
    return a1;
  }
};