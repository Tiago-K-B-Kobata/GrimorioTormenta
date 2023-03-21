import * as cheerio from 'cheerio'
import { writeFile, appendFile } from 'fs/promises'


class talento {
    nome: String
    descrição: String
    requisito: String
    beneficio: String
    especial: String
}

let TALENTO:any = []

const url = 'https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate'
async function scrape(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quantH = $('div').find('div > h3')
       
    for(let i = 0; i < quantH.length; i++){
        const $h = $('div > h3').eq(i).text()
        const $r = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Pré-requisito),b:contains(Pré-requisitos),b:contains(Pré-requisíto)').text()
        const $b = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Benefício:)').text()
        const $e = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Especial:)').text()
        const $d = $('div > h3').eq(i).nextUntil('h3').has('p > i').text()

        
        const tal = new talento
        
        tal.nome = $h  
        
        tal.descrição = $d

        tal.requisito = $r
        
        tal.beneficio = $b
        
        tal.especial = $e
        
        
        
        TALENTO.push(tal)
        
    }
    
    writeFile('talentos.json',JSON.stringify(TALENTO, null, 2))
}    


scrape(url)