<template>
  <div class="resume-container min-h-screen bg-white">
    <!-- 简历头部 -->
    <div class="px-12 pt-16 pb-10 relative">
      <!-- 背景装饰 -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full opacity-60 -z-0"></div>
      
      <!-- 语言切换和姓名行 -->
      <div class="flex justify-between items-start mb-6 relative z-10">
        <div class="text-sm font-medium">
          <span class="text-blue-600 cursor-pointer px-2 py-1 bg-blue-50 rounded-md transition-all hover:bg-blue-100">中文</span>
          <span class="mx-2 text-gray-400">/</span>
          <span class="cursor-pointer hover:text-gray-700 px-2 py-1 rounded-md transition-all hover:bg-gray-50">EN</span>
        </div>
        <div class="text-right">
          <h1 class="text-5xl font-light text-gray-900 mb-4 tracking-tight">{{ resumeData.personalInfo.name }}</h1>
          <div class="flex justify-end">
            <span class="status-tag">{{ resumeData.personalInfo.status }}</span>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="flex justify-end mb-6 relative z-10">
        <div class="text-right text-sm space-y-3 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-gray-100">
          <div class="text-base font-medium text-gray-700">{{ resumeData.personalInfo.location }}</div>
          <div class="flex items-center justify-end space-x-8">
            <span class="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <span class="mr-2 text-base">📱</span>
              {{ resumeData.personalInfo.phone }}
            </span>
            <a :href="`mailto:${resumeData.personalInfo.email}`" class="resume-link flex items-center text-sm font-medium">
              <span class="mr-2 text-base">📧</span>
              {{ resumeData.personalInfo.email }}
            </a>
          </div>
        </div>
      </div>

      <!-- 技能标签 -->
      <div class="flex justify-end mb-10 relative z-10">
        <div class="flex flex-wrap justify-end max-w-lg gap-2">
          <span 
            v-for="skill in resumeData.skills" 
            :key="skill"
            class="inline-block px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-200"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="px-12 pb-12 space-y-12">
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
            <div class="flex flex-wrap mt-3 mb-5 gap-2">
              <span 
                v-for="tech in experience.technologies" 
                :key="tech"
                class="inline-block px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-200"
              >
                {{ tech }}
              </span>
            </div>

            <!-- 工作内容 -->
            <div class="experience-content">
              <h4 class="font-semibold mb-4 text-gray-800 text-base flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                {{ experience.title }}
              </h4>
              <ul class="space-y-3 text-sm text-gray-700">
                <li v-for="(achievement, idx) in experience.achievements" :key="idx" class="flex items-start group">
                  <span class="text-blue-500 mr-3 flex-shrink-0 w-4 h-4 flex items-center justify-center mt-1 transition-transform group-hover:scale-110">✓</span>
                  <span class="flex-1 leading-relaxed">{{ achievement }}</span>
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
            v-for="(project, index) in resumeData.projects" 
            :key="index"
            class="experience-card"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              {{ project.name }}
            </h3>
            <ul class="space-y-3 text-sm text-gray-700 mb-4">
              <li v-for="(description, idx) in project.descriptions" :key="idx" class="flex items-start group">
                <span class="text-blue-500 mr-3 flex-shrink-0 w-4 h-4 flex items-center justify-center mt-1 transition-transform group-hover:scale-110">✓</span>
                <span class="flex-1 leading-relaxed">{{ description }}</span>
              </li>
            </ul>
            
            <!-- 项目技术标签 -->
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="inline-block px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-200"
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
        <div class="experience-card">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                {{ resumeData.education.school }}
              </h3>
              <p class="text-base text-gray-600 mt-2 ml-5">{{ resumeData.education.degree }}</p>
            </div>
            <span class="text-base text-gray-500 whitespace-nowrap font-medium">{{ resumeData.education.dateRange }}</span>
          </div>
        </div>
      </section>

      <!-- 自我评价 -->
      <section>
        <h2 class="section-title">自我评价</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(evaluation, index) in resumeData.selfEvaluation" :key="index" class="flex items-start group p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
            <span class="text-blue-500 mr-3 flex-shrink-0 w-4 h-4 flex items-center justify-center mt-1 transition-transform group-hover:scale-110">★</span>
            <span class="flex-1 text-sm text-gray-700 leading-relaxed">{{ evaluation }}</span>
          </div>
        </div>
      </section>

      <!-- 其他链接 -->
      <section>
        <h2 class="section-title">其他链接</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(link, index) in resumeData.links" :key="index" class="flex items-center p-4 rounded-lg bg-gradient-to-r from-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
            <span class="mr-3 text-lg transition-transform group-hover:scale-110">{{ link.icon }}</span>
            <div class="flex-1">
              <span class="text-sm font-medium text-gray-700 block">{{ link.label }}</span>
              <a :href="link.url" class="resume-link text-sm" target="_blank">{{ link.url }}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 简历数据
const resumeData = ref({
  personalInfo: {
    name: 'Ryan',
    status: '求职中',
    location: '北京    前端开发',
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
      title: '企业级动态页签 & 路由管理框架',
      achievements: [
        '本项目旨在为复杂的 SPA 应用提供一种可扩展、易于维护的动态页签框架，通过与 Vue Router 深度集成，确保每个页签与路由状态同步，提升用户体验，适用工具自有多项隐型的后台管理系统，支持高效的页面切换和组件缓存',
        '设计并实现了基于 Vue 3 和 Vue Router 的动态页签管理框架，解决了页面回显合意理和路由同步的难题',
        '实现了精细化的基于页签的路由历史控制，确保不同页签之间的状态隔离',
        '通过管理页面组件实例，避免了频繁的组件重建和页面重渲，显著提升了应用性能'
      ]
    },
    {
      company: '北京商越网络科技有限公司',
      position: '前端开发实习生',
      dateRange: '2022-08 ~ 2023-06',
      technologies: ['Vue', 'JavaScript', 'Node.js', 'Webpack', 'Egg.js'],
      title: '供应商管理',
      achievements: [
        '从邀请供应商、供应商认证、供应商入围、供应商备案、在线邀约等全生命周期管理',
        '通过前端分页技术，解决了在线分页的数据存储痛点（单次可达 10000 条），提升了页面性能',
        '参与并拓展行业务求来代，业务组件封装'
      ]
    }
  ],
  projects: [
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
      icon: '🌟',
      label: 'GitHub',
      url: 'https://github.com/au-to'
    },
    {
      icon: '🏠',
      label: '个人博客',
      url: 'https://www.ryan-blog.cn'
    }
  ]
})
</script>

<style scoped>
/* 组件特定样式可以在这里添加 */
</style>