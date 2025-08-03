# PDF导出功能使用指南

## 功能概述

本项目已集成Puppeteer，支持高质量的PDF简历导出功能，相比传统的html2canvas、jsPDF等前端方案，具有以下优势：

- ✅ **更高的渲染质量**：使用真实的Chrome浏览器渲染引擎
- ✅ **完美的字体支持**：支持网络字体和复杂排版
- ✅ **精确的样式还原**：CSS样式100%还原
- ✅ **智能分页处理**：避免内容被切断
- ✅ **矢量图形支持**：SVG图标完美呈现

## 安装依赖

```bash
npm install
```

## 启动方式

### 开发环境

```bash
# 方式1: 同时启动前端和后端开发服务器（推荐）
npm run dev:full

# 方式2: 分别启动
npm run dev        # 启动前端开发服务器 (http://localhost:5173)
npm run dev:server # 启动PDF生成服务器 (http://localhost:3001)
```

### 生产环境

```bash
# 构建前端并启动服务器
npm run build:server

# 或者先构建，再启动
npm run build
npm start
```

## 使用方法

1. 访问简历页面：`http://localhost:5173`
2. 点击右上角的"导出PDF"按钮
3. 等待PDF生成完成
4. 自动下载生成的PDF文件

## 技术架构

```
前端 (Vue 3) ←→ 后端 (Express + Puppeteer)
     ↓                    ↓
  用户交互            PDF生成服务
     ↓                    ↓
  发送请求            浏览器渲染
     ↓                    ↓
  下载PDF            返回PDF数据
```

## 自定义配置

### PDF选项配置

在`src/components/ResumeTemplate.vue`中的`exportPDF`函数里可以自定义PDF生成选项：

```javascript
const response = await fetch('/api/generate-pdf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: currentUrl,
    options: {
      format: 'A4',           // 页面大小：A4, A3, Letter等
      printBackground: true,   // 是否打印背景
      margin: {               // 页边距
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      scale: 1,               // 缩放比例：0.1-2
      displayHeaderFooter: false, // 是否显示页眉页脚
      landscape: false,       // 是否横向
      pageRanges: '',         // 页面范围：'1-5, 8, 11-13'
    }
  })
})
```

### 服务器配置

在`server/index.js`中可以自定义Puppeteer启动选项：

```javascript
browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',     // 允许跨域
    '--font-render-hinting=none', // 字体渲染优化
  ]
})
```

## 打印样式优化

项目已针对PDF输出进行了专门的样式优化：

1. **颜色保真**：使用`print-color-adjust: exact`确保颜色准确
2. **分页控制**：使用`page-break-inside: avoid`避免内容被切断
3. **字体优化**：针对打印调整字体大小和行高
4. **间距调整**：优化PDF中的元素间距

## 故障排除

### 常见问题

1. **PDF生成失败**
   - 检查服务器是否正常启动
   - 确认端口3001没有被占用
   - 检查Puppeteer是否正确安装

2. **字体显示异常**
   - 确保网络字体加载完成
   - 检查CSS中的字体引用

3. **样式丢失**
   - 检查CSS是否包含打印媒体查询
   - 确认`printBackground: true`选项

### 日志调试

服务器会输出详细的PDF生成日志：

```bash
启动浏览器...
创建新页面...
导航到页面: http://localhost:5173
生成PDF...
PDF生成成功
浏览器已关闭
```

## 部署注意事项

### Docker部署

如需Docker部署，Dockerfile示例：

```dockerfile
FROM node:20-alpine

# 安装Puppeteer依赖
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# 设置Puppeteer使用系统Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
```

### 云服务器部署

在Linux服务器上需要安装Chrome/Chromium的依赖：

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# CentOS/RHEL
sudo yum install -y pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
```

## API文档

### POST /api/generate-pdf

生成PDF文件

**请求体：**
```json
{
  "url": "http://localhost:5173",
  "options": {
    "format": "A4",
    "printBackground": true,
    "margin": {
      "top": "0.5in",
      "right": "0.5in", 
      "bottom": "0.5in",
      "left": "0.5in"
    }
  }
}
```

**响应：**
- 成功：返回PDF文件流
- 失败：返回JSON错误信息

### GET /api/health

健康检查端点

**响应：**
```json
{
  "status": "ok",
  "message": "PDF服务运行正常",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

## 许可证

本PDF功能基于MIT许可证开源。