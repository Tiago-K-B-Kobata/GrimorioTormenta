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
    const quant = $('div').find('div > h3')
    writeFile('talentos.json','[')
    for(let i = 0; i < quant.length; i++){
    const $h = $('div > h3').eq(i).text()
    // const $p = $('p').text()

    const tal = new talentos
    tal.nome = $h
    // tal.P = $p
    // console.log($h)
    await appendFile('talentos.json',JSON.stringify(tal, null, 1))
    if(i < quant.length - 1){
    appendFile('talentos.json',',')
        }
    }
    appendFile('talentos.json',']')
}    


scrape(url)