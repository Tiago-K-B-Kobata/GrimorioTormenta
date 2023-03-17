import * as cheerio from 'cheerio'
import { writeFile, appendFile } from 'fs/promises'

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quant = $('div').find('h3')
    for(let i = 0; i <= quant.length; i++){
    const $h = $('h3').eq(i).text()
//    const $p = $('p').text()
    console.log($h)
    appendFile('talentos.json',JSON.stringify($h, null, 2))
    }
}    


scrape(url)