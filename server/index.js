import express from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 静态文件服务 - 在生产环境中提供前端构建文件
app.use(express.static(path.join(__dirname, '../dist')))

// PDF生成路由
app.post('/api/generate-pdf', async (req, res) => {
  let browser = null
  
  try {
    const { url, options = {} } = req.body
    
    if (!url) {
      return res.status(400).json({ error: '缺少URL参数' })
    }

    console.log('启动浏览器...')
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    })

    console.log('创建新页面...')
    const page = await browser.newPage()
    
    // 设置视口大小
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    })

    console.log('导航到页面:', url)
    const response = await page.goto(url, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    })
    
    console.log('页面响应状态:', response.status())
    console.log('页面标题:', await page.title())

    // 等待字体加载完成
    await page.evaluateHandle('document.fonts.ready')
    
    // 额外等待确保所有内容加载完成
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('生成PDF...')
    
    // 构建PDF选项，支持自定义尺寸
    const pdfOptions = {
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      displayHeaderFooter: false,
      omitBackground: false,
      tagged: false,
      ...options
    }
    
    // 如果提供了自定义宽度和高度，则使用自定义尺寸，否则使用A4
    if (options.width && options.height) {
      pdfOptions.width = options.width
      pdfOptions.height = options.height
      // 删除format选项，因为我们使用自定义尺寸
      delete pdfOptions.format
    } else {
      pdfOptions.format = 'A4'
    }
    
    console.log('PDF生成选项:', JSON.stringify(pdfOptions, null, 2))

    const pdf = await page.pdf(pdfOptions)

    console.log('PDF生成成功')
    console.log(`PDF大小: ${pdf.length} 字节`)
    
    // 验证PDF数据有效性
    if (!pdf || pdf.length === 0) {
      throw new Error('生成的PDF文件为空')
    }
    
    // 调试PDF文件头信息
    const pdfHeader = pdf.toString('ascii', 0, 10)
    console.log('PDF文件头:', pdfHeader)
    console.log('PDF前16字节 (hex):', pdf.subarray(0, 16).toString('hex'))
    
    // 暂时移除严格的PDF格式验证，用于调试
    // if (!pdf.toString('ascii', 0, 4).startsWith('%PDF')) {
    //   throw new Error('生成的文件不是有效的PDF格式')
    // }
    
    // 设置响应头
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"')
    res.setHeader('Content-Length', pdf.length)
    res.setHeader('Cache-Control', 'no-cache')
    
    // 确保以二进制格式发送PDF数据
    res.end(pdf, 'binary')
    
  } catch (error) {
    console.error('PDF生成失败:', error)
    res.status(500).json({ 
      error: '生成PDF失败',
      message: error.message 
    })
  } finally {
    if (browser) {
      await browser.close()
      console.log('浏览器已关闭')
    }
  }
})

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PDF服务运行正常',
    timestamp: new Date().toISOString()
  })
})

// 在生产环境中，所有其他路由都返回index.html (SPA路由支持)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`PDF生成服务器运行在 http://localhost:${PORT}`)
  console.log(`健康检查: http://localhost:${PORT}/api/health`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭服务器...')
  process.exit(0)
})