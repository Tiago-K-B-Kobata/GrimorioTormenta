import * as cheerio from 'cheerio'
import { writeFile, appendFile } from 'fs/promises'

class talento {
    nome: String
    requisito: String
    beneficio: String
    especial: String
}

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quantH = $('div').find('div > h3')
    const quantP = $('div').find('div > p')
   
    writeFile('talentos.json','[')
    
    for(let i = 0; i < quantH.length; i++){
        const $h = $('div > h3').eq(i).text()
        const $r = $('p > b').eq(i).nextUntil('h3').text()
        
        
        const tal = new talento
        
        tal.nome = $h  
        if($r == $('p > b:contains(Pré-requisito:)').text())
            tal.requisito = $('p:contains(Pré-requisito:)').text()
        // console.log($h)
        
        
        
        await appendFile('talentos.json',JSON.stringify(tal, null, 1))
        if(i < quantH.length - 1){
            appendFile('talentos.json',',')
        }
    }
    appendFile('talentos.json',']')
}    


scrape(url)