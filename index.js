const axios = require("axios");
const cheerio = require("cheerio");

let urls = ["https://www.tokyopop.de/kalender/"];

    async function test() {
      let links = [];
      await axios.get(urls[0]).then(response => {
        const $ = cheerio.load(response.data);
        const urlElems = $("div.framemenu--list");
        const nextelm = $(urlElems).find("div.framemenu--list-item")

        for (let i = 0; i < (nextelm.length - 1); i++) {
          links.push($(nextelm[i]).find("a")[0].attribs.href)
          }

        })
        linktest(links)
        }

      test()

      async function linktest(links) {
        let data = {}
        /*links.forEach(url => {
          console.log(url)
        })*/
      await axios.get(links[0]).then(response => {
        const $ = cheerio.load(response.data);
        const urlElems = $("div.listing");
        const nextelm = $(urlElems).find("div.product--box")
        for (let i = 0; i < (nextelm.length); i++) {
          let mainimgcont = $(nextelm[i]).find("span.image--media")[0]
          let imgs = $(mainimgcont).find("img")[0].attribs.srcset
          let titles = $(nextelm[i]).find("a.product--title")[0].attribs.title
          let pricecont = $(nextelm[i]).find("span.price--default")[0]
          let price = $(pricecont).text().replace(/(\r\n|\n|\r|\*)/gm,"")

          console.log(price)
         // console.log($(nextelm[i]).find("a")[0].attribs.href))
          }

        })
        //linktest(links)
      }