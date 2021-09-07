/**
 * @description 定义路由
 * @author 凉风有信、
 */

import { Router, Request, Response } from 'express'
import DellCrowller from '../单例模式/DellCrowller'
import { DellAnalyzer } from '../单例模式/DellAnalyzer'

const router = Router()

const url = 'http://www.dell-lee.com/'
const analyzer = DellAnalyzer.getInstance()

router.get('/', (req: Request, res: Response) => {
  new DellCrowller(analyzer, url)
  
  res.send('getData Success')
})

export default router