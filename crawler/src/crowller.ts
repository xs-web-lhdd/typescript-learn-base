// 可在node发送请求
import superagent from 'superagent' // 记得安装类型定义文件依赖
import cheerio from 'cheerio'
// node核心模块
import fs from 'fs'
import path from 'path'

interface Msg {
  title: string,
  imgUrl: string | undefined
}

interface MsgResult {
  time: number,
  data: Msg[]
}

interface Content {
  [propName: number]: Msg[]
}

class Crowller {
  private url = 'http://www.dell-lee.com/'

  private rawHtml = ''

  // 获取页面html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  // 获取所需部分并存入数组中
  getJsonInfo(html: string) {
    let MsgArr: Msg[] = []
    const $ = cheerio.load(html);
    const CourseItems = $('.course-item')
    // 将想爬取的 title imgUrl 择出来
    CourseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const imgs = $(element).find('.course-img')
      const title = descs.text()
      const imgUrl = imgs.eq(0).attr("src")
      MsgArr.push({title,  imgUrl})
    })
    const result = {
      time: new Date().getTime(),
      data: MsgArr
    }
    return result
  }

  // 流程执行过程：
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const Msg = this.getJsonInfo(html)
    this.saveJsonContent(Msg)
  }

  // 存放在JSON文件中
  saveJsonContent(Msg: MsgResult) {
    const filePath = path.resolve(__dirname, '../data/Msg.json')
    let fileContent: Content = {}
    
    // // 判断是否存在
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[Msg.time] = Msg.data
    fs.writeFileSync(filePath, JSON.stringify(fileContent))
  }

  constructor () {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()