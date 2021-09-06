// 可在node发送请求
import superagent from 'superagent' // 记得安装类型定义文件依赖
import cheerio from 'cheerio'

interface Msg {
  title: string,
  imgUrl: string | undefined
}

class Crowller {
  private url = 'http://www.dell-lee.com/'

  private rawHtml = ''

  async getRawHtml() {
    const result = await superagent.get(this.url)
    const htmlString = result.text
    this.getJsonInfo(htmlString)
  }

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
    console.log(result);
    
  }

  constructor () {
    this.getRawHtml()
  }
}

const crowller = new Crowller()