import * as cheerio from 'cheerio'
import { writeFile, appendFile } from 'fs/promises'

class talentos {
    nome: String
    P: String 
}

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quant = $('div').find('h3')
    for(let i = 0; i <= quant.length; i++){
    const $h = $('h3').eq(i).text()
    // const $p = $('p').text()

    const tal = new talentos
    tal.nome = $h
    // tal.P = $p
    // console.log($h)
    appendFile('talentos.json',JSON.stringify(tal, null, 2))
    }
}    


scrape(url)