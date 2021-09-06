// 可在node发送请求
import superagent from 'superagent' // 记得安装类型定义文件依赖
// node核心模块
import fs from 'fs'
import path from 'path'

import { DellAnalyzer } from './analyzer'


export interface Analyzer {
  anylize: (html: string, filePath: string) => string
}


class Crowller {

  private filePath = path.resolve(__dirname, '../data/Msg.json')

  // 获取页面html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }


  // 流程执行过程：
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.anylize(html, this.filePath)
    this.writeFile(fileContent)
  }


  // 读写文件
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  constructor (private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess()
  }
}

const url = 'http://www.dell-lee.com/'

const analyzer = new DellAnalyzer()
const crowller = new Crowller(analyzer, url)