/**
 * @description 定义路由
 * @author 凉风有信、
 */

import { Router, Request, Response } from 'express'
import DellCrowller from '../单例模式/DellCrowller'
import { DellAnalyzer } from '../单例模式/DellAnalyzer'
import path from 'path'
import fs from 'fs'


interface RequestWithBody extends Request {
  body: {
    password: string | undefined,
    [key: string]: string | undefined
  }
}

const router = Router()

const url = 'http://www.dell-lee.com/'
const analyzer = DellAnalyzer.getInstance()

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
    <html>
      <body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
        <a href='/logout'>退出</a>
      </body>
    </html>
    `)
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>登录</button>
        </form>
      </body>
    </html>
  `)
  }
})

router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    new DellCrowller(analyzer, url)
    res.send('getData Success')
    return
  }
  res.send(`请登陆后爬取内容！`)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false

  if(isLogin) {
    res.send('你已登录成功！')
  } else {
    if (password === '123' && req.session) {
      if (req.session) {
        req.session.login = true
        res.send('登录成功！')
      }
    } else {
      res.send('登陆失败！')
    }
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.redirect('/')
})

router.get('/showData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    try {
      const position = path.resolve(__dirname, '../../data/DellMsg.json')
      const result = fs.readFileSync(position, 'utf-8')
      res.json(JSON.parse(result))
    } catch (error) {
      res.send('尚未爬取到内容')
    }
  } else {
    res.send('请先登录。。。')
  }
})

export default router