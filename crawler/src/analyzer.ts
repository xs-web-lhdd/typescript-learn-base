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

import cheerio from 'cheerio'
import fs from 'fs'

export class DellAnalyzer {

  // 获取所需部分并存入数组中
  private getJsonInfo(html: string) {
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

      // 存放在JSON文件中
  saveJsonContent(Msg: MsgResult, filePath: string) {
    let fileContent: Content = {}
    
    // // 判断是否存在
    if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') !== '' ) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[Msg.time] = Msg.data
    return fileContent
  }

  public anylize(html: string, filePath: string) {
    const Msg = this.getJsonInfo(html)
    const fileContent = this.saveJsonContent(Msg, filePath)    
    return JSON.stringify(fileContent)
  }
}