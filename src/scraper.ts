import * as cheerio from 'cheerio'
import { writeFile, readFile } from 'fs/promises'

class talento {
    nome: String
    descrição: String
    requisito: String
    beneficio: String
    especial: String
    custo: String
    tabela: String
}

class magia {
    nome: String
    nivel: String
    Temp_Exec: String
    alcance: String
    alvo: String
    duracao: String
    resistencia: String
}

let TALENTO:any = []
let MAGIA:any = []

const urlT = ['https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate','https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Magia','https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Per%C3%ADcia']
const urlM = ['https://tsrd.fandom.com/pt-br/wiki/Magias_A']


async function scrapeTalento(url){
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quantH = $('div').find('div > h3')
       
    for(let i = 0; i < quantH.length; i++){
        const $h = $('div > h3').eq(i).text()
        const $r = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Pré-requisito),b:contains(Pré-requisíto)').text()
        const $b = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Benefício)').text()
        const $e = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Especial)').text()
        const $d = $('div > h3').eq(i).nextUntil('h3').has('p > i').text()
        const $c = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Custo)').text()
        const $t = $('div > h3').eq(i).nextUntil('h3').has('tr > td').text()
        
        const tal = new talento
        
        tal.nome = $h        
        tal.descrição = $d
        tal.requisito = $r        
        tal.beneficio = $b        
        tal.especial = $e
        tal.custo = $c
        tal.tabela = $t     
        
        TALENTO.push(tal)
        
    }
    
   await writeFile('talentos.json',JSON.stringify(TALENTO, null, 2))
}    

async function scrapeMagia(url) {
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quantH = $('div').find('h2')
    
    for(let i = 0; i < quantH.length; i++){
        const $h  = $('h2').eq(i).text()
        const $n  = $('h2').eq(i).nextUntil('h2').find('li:contains(Nível)').text()
        const $t  = $('h2').eq(i).nextUntil('h2').find('li:contains(Tempo de Execução)').text()
        const $ac = $('h2').eq(i).nextUntil('h2').find('li:contains(Alcance)').text()
        const $av = $('h2').eq(i).nextUntil('h2').find('li:contains(Área),li:contains(Alvo)').text()
        const $d  = $('h2').eq(i).nextUntil('h2').find('li:contains(Duração)').text()
        const $r  = $('h2').eq(i).nextUntil('h2').find('li:contains(Teste de Resistência)').text()
        
        const mag = new magia
        
        mag.nome = $h        
        mag.nivel = $n
        mag.Temp_Exec = $t        
        mag.alcance = $ac        
        mag.alvo = $av
        mag.duracao = $d
        mag.resistencia = $r    
        
        MAGIA.push(mag)
        
    }
    await writeFile('magias.json',JSON.stringify(MAGIA, null, 2))
}

 urlM.forEach(scrapeMagia)