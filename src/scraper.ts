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
    desc: String
}

let TALENTO:any = []
let MAGIA:any = []

const urlT = ['https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Combate','https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Magia','https://tsrd.fandom.com/pt-br/wiki/Talentos_de_Per%C3%ADcia']
const urlM = ['https://tsrd.fandom.com/pt-br/wiki/Magias_A','https://tsrd.fandom.com/pt-br/wiki/Magias_B','https://tsrd.fandom.com/pt-br/wiki/Magias_C','https://tsrd.fandom.com/pt-br/wiki/Magias_D','https://tsrd.fandom.com/pt-br/wiki/Magias_E','https://tsrd.fandom.com/pt-br/wiki/Magias_F','https://tsrd.fandom.com/pt-br/wiki/Magias_G','https://tsrd.fandom.com/pt-br/wiki/Magias_H','https://tsrd.fandom.com/pt-br/wiki/Magias_I','https://tsrd.fandom.com/pt-br/wiki/Magias_J','https://tsrd.fandom.com/pt-br/wiki/Magias_L','https://tsrd.fandom.com/pt-br/wiki/Magias_M','https://tsrd.fandom.com/pt-br/wiki/Magias_N','https://tsrd.fandom.com/pt-br/wiki/Magias_O','https://tsrd.fandom.com/pt-br/wiki/Magias_P','https://tsrd.fandom.com/pt-br/wiki/Magias_Q','https://tsrd.fandom.com/pt-br/wiki/Magias_R','https://tsrd.fandom.com/pt-br/wiki/Magias_S','https://tsrd.fandom.com/pt-br/wiki/Magias_T','https://tsrd.fandom.com/pt-br/wiki/Magias_V','https://tsrd.fandom.com/pt-br/wiki/Magias_Z']

// async function scrapeTalento(url){
//     const res = await fetch(url)
//     const html = await res.text()
//     const $ = cheerio.load(html)
//     const quantH = $('div').find('div > h3')
       
//     for(let i = 0; i < quantH.length; i++){
//         const $h = $('div > h3').eq(i).text()
//         const $r = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Pré-requisito),b:contains(Pré-requisíto)').text()
//         const $b = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Benefício)').text()
//         const $e = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Especial)').text()
//         const $d = $('div > h3').eq(i).nextUntil('h3').has('p > i').text()
//         const $c = $('div > h3').eq(i).nextUntil('h3').has('b:contains(Custo)').text()
//         const $t = $('div > h3').eq(i).nextUntil('h3').has('tr > td').text()
        
//         const tal = new talento
        
//         tal.nome = $h        
//         tal.descrição = $d
//         tal.requisito = $r        
//         tal.beneficio = $b        
//         tal.especial = $e
//         tal.custo = $c
//         tal.tabela = $t     
        
//         TALENTO.push(tal)
        
//     }
    
//    await writeFile('talentos.json',JSON.stringify(TALENTO, null, 2))
// }    

async function scrapeMagia(url) {
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const quantH = $('div').filter('#mw-content-text').find('h2')
    
    for(let i = 0; i < (quantH.length - 1); i++){
        const $h  = $('h2').not('#mw-toc-heading').eq(i).text()
        const $n  = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Nível)').text()
        const $t  = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Tempo de Execução)').text()
        const $ac = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Alcance)').text()
        const $av = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Área),li:contains(Alvo)').text()
        const $d  = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Duração)').text()
        const $r  = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('li:contains(Teste de Resistência)').text()
        const $dc  = $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').find('td').text() || $('h2').not('#mw-toc-heading').eq(i).nextUntil('h2').next('p').text()
        
        const mag = new magia
        
        mag.nome = $h        
        mag.nivel = $n
        mag.Temp_Exec = $t        
        mag.alcance = $ac        
        mag.alvo = $av
        mag.duracao = $d
        mag.resistencia = $r
        mag.desc = $dc    
        
        MAGIA.push(mag)
        
    }
    await writeFile('magias.json',JSON.stringify(MAGIA, null, 2))
}

async function organizeMagia() {
    const rawData = await readFile('magias.json','utf-8')
    const midData = rawData.toLocaleLowerCase()
    const data = await JSON.parse(midData)
    const magias = data.filter(mag => mag.nivel.includes('ilusão') ).map(mag  => mag.nome ).sort()
    console.log(magias)
    
}

// urlM.forEach(scrapeMagia)
organizeMagia()