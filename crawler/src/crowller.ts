// 可在node发送请求
import superagent from 'superagent' // 记得安装类型定义文件依赖

class Crowller {
  private url = 'http://www.dell-lee.com/'

  private rawHtml = ''

  async getRawHtml() {
    const result = await superagent.get(this.url)
    console.log(result.text);
    
  }

  constructor () {
    this.getRawHtml()
  }
}

const crowller = new Crowller()