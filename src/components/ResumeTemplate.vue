<template>
  <div class="resume-container min-h-screen bg-white">
    <!-- PDF导出按钮 - 仅在非打印模式下显示 -->
    <div class="print:hidden fixed top-4 right-4 z-10 space-y-2">
      <!-- 导出格式选择 -->
      <div class="bg-white rounded-lg shadow-lg p-3 text-sm">
        <label class="block text-gray-700 mb-2">PDF尺寸:</label>
        <select v-model="pdfFormat" class="w-full p-1 border rounded text-sm">
          <option value="auto">自适应高度</option>
          <option value="A4">A4标准</option>
          <option value="A3">A3大页面</option>
          <option value="Legal">Legal格式</option>
        </select>
      </div>
      
      <button 
        @click="exportPDF"
        :disabled="isExporting"
        class="pdf-export-btn w-full"
      >
        <svg v-if="!isExporting" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isExporting ? '生成中...' : '导出PDF' }}
      </button>
    </div>

    <!-- 简历头部 -->
    <div class="px-8 pt-10 pb-6">
      <!-- 语言切换和姓名行 -->
      <div class="flex justify-between items-start mb-4">
        <div class="text-sm text-gray-500">
          <!-- <span class="text-green-600 cursor-pointer">中文</span>
          <span class="mx-1">/</span>
          <span class="cursor-pointer hover:text-gray-700">EN</span> -->
        </div>
        <div class="text-right">
          <h1 class="text-5xl font-light text-gray-900 mb-3">{{ resumeData.personalInfo.name }}</h1>
          <div class="flex justify-end">
            <span class="status-tag">{{ resumeData.personalInfo.status }}</span>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="flex justify-end mb-4">
        <div class="text-right text-sm text-gray-600 space-y-2">
          <div class="text-sm">{{ resumeData.personalInfo.location }} {{ resumeData.personalInfo.job }}</div>
          <div class="flex items-center justify-end space-x-6">
            <span class="flex items-center text-sm">
              <span>
                <svg t="1754195191269" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5750" width="16" height="16">
                  <path d="M721 928.6c38.8 0 61.5-8.1 64.6-11.2L917 786a40.1 40.1 0 0 0 0-56.6L769.3 581.7a40.1 40.1 0 0 0-56.6 0l-96 96-13-9.2a1036.9 1036.9 0 0 1-249.3-249.2l-9.2-13.1 96-96a40.1 40.1 0 0 0 0-56.6L294.8 107.2a39.8 39.8 0 0 0-56.6 0L106.7 238.6c-9.2 9.3-67 201.6 204.3 473 182.8 182.7 330.2 217 410 217zM179.3 382.3c-15.4-53.7-12.5-89.5-10-104.4l97.2-97.2 101.2 101.2-73.4 73.4-42.9 42.9 35 49.6 9.2 13a1108 1108 0 0 0 266.5 266.6l13.1 9.2 49.5 35 42.9-42.9 73.4-73.4 102.5 102.4-97.1 97a153.8 153.8 0 0 1-25.4 1.9c-28.4 0-75.2-5.9-136.8-33.6-72.4-32.7-147.2-87.3-222.3-162.3-52.5-52.6-95.4-105.5-127.3-157.3-25.6-41.4-44.2-82.2-55.3-121.1z" p-id="5751">
                  </path>
              </svg>
              </span>
              {{ resumeData.personalInfo.phone }}
            </span>
            <a :href="`mailto:${resumeData.personalInfo.email}`" class="resume-link flex items-center text-sm">
              <span class="mr-1">
                <svg t="1754194757372" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4539" width="16" height="16">
                  <path d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z" fill="#111" p-id="4540">
                  </path>
                </svg>
              </span>
              {{ resumeData.personalInfo.email }}
            </a>
          </div>
        </div>
      </div>

      <!-- 技能标签 -->
      <div class="flex justify-end mb-8">
        <div class="flex flex-wrap justify-end max-w-md">
          <span 
            v-for="skill in resumeData.skills" 
            :key="skill"
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="px-8 pb-10 space-y-8">
      <!-- 工作经历 -->
      <section>
        <h2 class="section-title">工作经历</h2>
        <div class="space-y-10">
          <div 
            v-for="(experience, index) in resumeData.experiences" 
            :key="index"
            class="experience-card"
          >
            <div class="experience-header">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ experience.company }}</h3>
                <p class="text-base text-gray-600 mt-1">{{ experience.position }}</p>
              </div>
              <span class="text-base text-gray-500 whitespace-nowrap">{{ experience.dateRange }}</span>
            </div>
            
            <!-- 技能标签 -->
            <div class="flex flex-wrap mt-2 mb-4">
              <span 
                v-for="tech in experience.technologies" 
                :key="tech"
                class="inline-block px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded mr-2 mb-1"
              >
                {{ tech }}
              </span>
            </div>

            <!-- 工作内容 -->
            <div class="experience-content mt-4" v-for="(project, index) in experience.projects" :key="index">
              <h4 class="font-semibold mb-3 text-gray-700 text-base">{{ project.name }}</h4>
              <ul class="space-y-3 text-sm text-gray-700">
                <li v-for="(achievement, idx) in project.descriptions" :key="idx" class="flex">
                  <span class="text-gray-500 mr-2 flex-shrink-0 w-3 h-6 flex items-center justify-center">•</span>
                  <span class="flex-1 leading-6">{{ achievement }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 个人项目 -->
      <section>
        <h2 class="section-title">个人项目</h2>
        <div class="space-y-6">
          <div 
            v-for="(project, index) in resumeData.personalProjects" 
            :key="index"
            class="experience-card"
          >
            <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ project.name }}</h3>
            <ul class="space-y-2 text-sm text-gray-700 mb-3">
              <li v-for="(description, idx) in project.descriptions" :key="idx" class="flex">
                <span class="text-gray-500 mr-2 flex-shrink-0 w-3 h-6 flex items-center justify-center">•</span>
                <span class="flex-1 leading-6">{{ description }}</span>
              </li>
            </ul>
            
            <!-- 项目技术标签 -->
            <div class="flex flex-wrap">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="inline-block px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded mr-2 mb-1"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 教育经历 -->
      <section>
        <h2 class="section-title">教育经历</h2>
        <div class="education-item">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="school-name">{{ resumeData.education.school }}</h3>
              <p class="degree-info">{{ resumeData.education.degree }}</p>
            </div>
            <span class="date-range">{{ resumeData.education.dateRange }}</span>
          </div>
        </div>
      </section>

      <!-- 自我评价 -->
      <section>
        <h2 class="section-title">自我评价</h2>
        <ul class="space-y-2 text-sm text-gray-700">
          <li v-for="(evaluation, index) in resumeData.selfEvaluation" :key="index" class="flex">
            <span class="text-gray-500 mr-2 flex-shrink-0 w-3 h-6 flex items-center justify-center">•</span>
            <span class="flex-1 leading-6">{{ evaluation }}</span>
          </li>
        </ul>
      </section>

      <!-- 其他链接 -->
      <section>
        <h2 class="section-title">其他链接</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="(link, index) in resumeData.links" :key="index" class="flex items-center">
            <span class="mr-2" v-html="link.icon"></span>
            <span class="mr-2">{{ link.label }}：</span>
            <a :href="link.url" class="resume-link" target="_blank">{{ link.url }}</a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导出状态
const isExporting = ref(false)
const pdfFormat = ref('auto')

// 计算动态页面高度
const calculatePageHeight = () => {
  const container = document.querySelector('.resume-container')
  if (container) {
    const containerHeight = container.scrollHeight
    // 添加一些额外空间以确保完整显示
    const extraSpace = 100
    return `${containerHeight + extraSpace}px`
  }
  return 'auto'
}

// PDF导出功能
const exportPDF = async () => {
  if (isExporting.value) return
  
  try {
    isExporting.value = true
    
    // 获取当前页面URL
    const currentUrl = window.location.href
    
    // 根据选择的格式配置PDF选项
    let pdfOptions = {
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      pageRanges: '',
      omitBackground: false,
      tagged: false,
      scale: 1.0,
      displayHeaderFooter: false,
      landscape: false
    }

    // 根据用户选择的格式设置页面尺寸
    if (pdfFormat.value === 'auto') {
      const dynamicHeight = calculatePageHeight()
      console.log('计算的页面高度:', dynamicHeight)
      pdfOptions.width = '8.27in'  // A4宽度
      pdfOptions.height = dynamicHeight === 'auto' ? '11.69in' : dynamicHeight
      pdfOptions.preferCSSPageSize = false
    } else if (pdfFormat.value === 'A3') {
      pdfOptions.format = 'A3'
      pdfOptions.preferCSSPageSize = false
    } else if (pdfFormat.value === 'Legal') {
      pdfOptions.format = 'Legal'
      pdfOptions.preferCSSPageSize = false
    } else {
      pdfOptions.format = 'A4'
      pdfOptions.preferCSSPageSize = false
    }
    
    // 调用后端API生成PDF
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: currentUrl,
        options: pdfOptions
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'PDF生成失败')
    }
    
    // 检查响应类型
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/pdf')) {
      throw new Error('服务器返回的不是PDF文件')
    }
    
    // 获取PDF数据
    const blob = await response.blob()
    
    // 验证blob大小
    if (blob.size === 0) {
      throw new Error('PDF文件为空')
    }
    
    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `简历-${resumeData.value.personalInfo.name}-${new Date().toISOString().split('T')[0]}.pdf`
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL对象
    URL.revokeObjectURL(url)
    
    console.log('PDF导出成功')
    
  } catch (error) {
    console.error('PDF导出失败:', error)
    alert(`PDF导出失败: ${error.message}`)
  } finally {
    isExporting.value = false
  }
}

// 简历数据
const resumeData = ref({
  personalInfo: {
    name: 'Ryan',
    status: '求职中',
    location: '北京',
    job: '前端开发',
    phone: '18712764947',
    email: 'zhaohubiao553@gmail.com'
  },
  skills: ['TypeScript', 'Vue', 'React', 'Node.js', 'Python'],
  experiences: [
    {
      company: '北京商越网络科技有限公司',
      position: '前端开发工程师',
      dateRange: '2023-06 ~ 2025-04',
      technologies: ['Vue', 'JavaScript', 'TypeScript', 'Vite', 'Webpack', 'Node.js'],
      projects: [
        {
          name: '企业级动态页签 & 路由管理框架',
          descriptions: [
            '本项目旨在为复杂的 SPA 应用提供一种可扩展、易于维护的动态页签框架，通过与 Vue Router 深度集成，确保每个页签与路由状态同步，提升用户体验，适用工具自有多项隐型的后台管理系统，支持高效的页面切换和组件缓存',
            '设计并实现了基于 Vue 3 和 Vue Router 的动态页签管理框架，解决了页面回显合意理和路由同步的难题',
            '实现了精细化的基于页签的路由历史控制，确保不同页签之间的状态隔离',
            '通过管理页面组件实例，避免了频繁的组件重建和页面重渲，显著提升了应用性能'
          ]
        },
        {
          name: '企业级动态页签 & 路由管理框架',
          descriptions: [
            '本项目旨在为复杂的 SPA 应用提供一种可扩展、易于维护的动态页签框架，通过与 Vue Router 深度集成，确保每个页签与路由状态同步，提升用户体验，适用工具自有多项隐型的后台管理系统，支持高效的页面切换和组件缓存',
            '设计并实现了基于 Vue 3 和 Vue Router 的动态页签管理框架，解决了页面回显合意理和路由同步的难题',
            '实现了精细化的基于页签的路由历史控制，确保不同页签之间的状态隔离',
            '通过管理页面组件实例，避免了频繁的组件重建和页面重渲，显著提升了应用性能'
          ]
        }
      ]
    },
    {
      company: '北京商越网络科技有限公司',
      position: '前端开发实习生',
      dateRange: '2022-08 ~ 2023-06',
      technologies: ['Vue', 'JavaScript', 'Node.js', 'Webpack', 'Egg.js'],
      projects: [
        {
          name: '供应商管理',
          descriptions: [
            '从邀请供应商、供应商认证、供应商入围、供应商备案、在线邀约等全生命周期管理',
            '通过前端分页技术，解决了在线分页的数据存储痛点（单次可达 10000 条），提升了页面性能',
            '参与并拓展行业务求来代，业务组件封装'  
          ]
        },
        {
          name: '供应商管理',
          descriptions: [
            '从邀请供应商、供应商认证、供应商入围、供应商备案、在线邀约等全生命周期管理',
            '通过前端分页技术，解决了在线分页的数据存储痛点（单次可达 10000 条），提升了页面性能',
            '参与并拓展行业务求来代，业务组件封装'  
          ]
        }
      ]
    }
  ],
  personalProjects: [
    {
      name: '国际化自动提取 & 智能翻译工具',
      descriptions: [
        '通过编译分析 Vue 文件，自动提取中文文本并生成国际化的锁营',
        '对提取到的中文文本进行国际化翻译，自动化国际化翻译的过程',
        '整合生成和国际化翻译遗憾 AI 完成，支持自定义替换模型的 API Key'
      ],
      technologies: ['JavaScript', 'Node.js', '@vue/compiler-sfc', 'OpenAI']
    },
    {
      name: '支持服务端渲染的现代化个人网站',
      descriptions: [
        '使用 Next.js 构建的现代化个人网站，支持按需的动画效果，响应式设计和暗黑系统',
        '封装多个自定义动画组件，支持淡入、缩放、弹跳、限隆、现美效果等炫酷的动画效果',
        '基于 GitHub Actions 构建 CI/CD 流水线，实现自动化的持续集成与部署'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB']
    }
  ],
  education: {
    school: '燕山大学（国家重点）',
    degree: '本科 - 通信工程',
    dateRange: '2019-09 ~ 2023-06'
  },
  selfEvaluation: [
    '热爱开源，长期活跃于 Github 开源社区',
    'AI 工具深度用户，持续探索 AI 辅助的开发模式',
    '自驱学用的前端框架：Vue、React',
    '自驱学用的后端：Node.js、Python',
    '自驱学用的数据库：MySQL、MongoDB',
    '更求是做个卓越的 Programmer，梦想皇冠为一名优秀的全栈'
  ],
  links: [
    {
      icon: '<svg t="1754195520225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6753" width="16" height="16"><path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z" fill="#444444" p-id="6754"></path></svg>',
      label: 'GitHub',
      url: 'https://github.com/au-to'
    },
    {
      icon: '<svg t="1754195875036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11224" width="16" height="16"><path d="M290.0992 409.6H155.136a371.4048 371.4048 0 0 0-14.2848 102.4c0 35.5328 4.9664 69.888 14.336 102.4h134.9632c-5.632-32.768-8.4992-66.9184-8.4992-102.4 0-35.4816 2.8672-69.632 8.4992-102.4z m52.0704 0a542.1056 542.1056 0 0 0-9.3696 102.4c0 35.7376 3.072 69.888 9.3696 102.4H486.4V409.6H342.1696z m75.008 461.3632A491.8784 491.8784 0 0 1 301.568 665.6H173.9776a372.0704 372.0704 0 0 0 243.2 205.3632z m69.2224-3.584V665.6H354.9696c24.064 77.1072 67.84 144.2304 131.4304 201.8304zM417.1776 153.088A372.0704 372.0704 0 0 0 173.9776 358.4H301.568a491.8784 491.8784 0 0 1 115.5584-205.3632z m69.2224 3.584C422.8096 214.1184 379.0848 281.2416 354.9696 358.4H486.4V156.5696zM733.9008 409.6c5.632 32.768 8.4992 66.9184 8.4992 102.4 0 35.4816-2.8672 69.632-8.4992 102.4h135.0144c9.3184-32.512 14.2848-66.8672 14.2848-102.4s-4.9664-69.888-14.336-102.4h-134.9632z m-52.0704 0H537.6v204.8h144.2304c6.2464-32.512 9.3696-66.6624 9.3696-102.4s-3.072-69.888-9.3696-102.4z m-75.008 461.3632A372.0704 372.0704 0 0 0 850.0224 665.6H722.432a491.8784 491.8784 0 0 1-115.5584 205.3632z m-69.2224-3.584c63.5904-57.5488 107.3152-124.672 131.4304-201.7792H537.6v201.8304zM606.8224 153.088A491.8784 491.8784 0 0 1 722.432 358.4h127.6416a372.0704 372.0704 0 0 0-243.2-205.3632z m-69.2224 3.584V358.4h131.4304c-24.064-77.1072-67.84-144.2304-131.4304-201.8304zM512 947.2a435.2 435.2 0 1 1 0-870.4 435.2 435.2 0 0 1 0 870.4z" fill="#333" p-id="11225"></path></svg>',
      label: '个人网站',
      url: 'https://www.ryan-blog.cn'
    }
  ]
})
</script>

<style scoped>
/* 组件特定样式可以在这里添加 */
</style>