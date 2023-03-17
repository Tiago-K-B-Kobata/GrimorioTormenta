import * as cheerio from 'cheerio'
import { writeFile } from 'fs/promises'

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const $h = $('h3').text()
//    console.log($h)
    writeFile('talentos.json',JSON.stringify($h))
    }
    


scrape(url)