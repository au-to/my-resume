# Slim Resume - 在线简历制作工具

一个基于 Vue 3 + Express + MongoDB 的全栈在线简历制作工具。

## ✨ 功能特性

- 📝 可视化简历编辑器
- 🎨 多种简历模板
- 📱 响应式设计
- 💾 云端数据存储
- 📄 PDF 导出功能
- 👤 用户账户系统
- 🔒 数据安全保护

## 🚀 技术栈

### 前端
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 快速构建工具
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化CSS框架

### 后端
- **Express.js** - Node.js Web框架
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象模型
- **JWT** - 身份认证
- **bcryptjs** - 密码加密

## 📁 项目结构

```
slim-resume/
├── frontend/          # Vue 3 前端应用
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express 后端API
│   ├── models/        # 数据模型
│   ├── routes/        # 路由文件
│   ├── middleware/    # 中间件
│   ├── config/        # 配置文件
│   └── server.js      # 服务器入口
└── package.json       # 根目录配置
```

## 🛠️ 开发环境搭建

### 前置条件
- Node.js (v20.19.0+)
- MongoDB (本地或云端)
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd slim-resume
   ```

2. **安装所有依赖**
   ```bash
   npm run install:all
   ```

3. **配置环境变量**
   ```bash
   # 在 backend 目录下创建 .env 文件
   cd backend
   cp .env.example .env
   # 编辑 .env 文件，配置数据库连接等
   ```

4. **启动开发服务器**
   ```bash
   # 同时启动前端和后端
   npm run dev
   
   # 或者分别启动
   npm run dev:frontend  # 前端: http://localhost:5173
   npm run dev:backend   # 后端: http://localhost:3001
   ```

## 📊 数据模型

### 用户模型 (User)
- 用户认证信息
- 个人资料
- 账户状态

### 简历模型 (Resume)
- 个人信息
- 工作经历
- 教育背景
- 项目经验
- 技能清单
- 模板配置

## 🚀 部署

### 生产构建
```bash
npm run build
```

### 生产启动
```bash
npm start
```

## 📝 开发规范

- 遵循 ESLint 代码规范
- 使用 Prettier 格式化代码
- TypeScript 类型安全
- Git 提交规范

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 提交 Pull Request

## 📄 许可证

[ISC License](LICENSE)
