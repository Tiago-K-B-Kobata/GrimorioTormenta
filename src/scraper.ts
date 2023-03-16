import axios from "axios";
import * as cheerio from 'cheerio'
import { writeFile } from 'fs/promises'

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    axios.create()
    axios.get(url).then( Response => {
    const html = Response.data
    const $ = cheerio.load(html)
    const $h = $('h3').text()
    //console.log($h)
    writeFile('talentos.json',JSON.stringify($h))
    }
    )
}

scrape(url)