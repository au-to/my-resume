const mongoose = require('mongoose');

// 教育经历子模式
const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: [true, '学校名称是必填项']
  },
  degree: {
    type: String,
    required: [true, '学位是必填项']
  },
  major: {
    type: String,
    required: [true, '专业是必填项']
  },
  startDate: {
    type: Date,
    required: [true, '开始时间是必填项']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= this.startDate;
      },
      message: '结束时间不能早于开始时间'
    }
  },
  current: {
    type: Boolean,
    default: false
  },
  gpa: String,
  description: String
}, { _id: true });

// 工作经历子模式
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, '公司名称是必填项']
  },
  position: {
    type: String,
    required: [true, '职位是必填项']
  },
  location: String,
  startDate: {
    type: Date,
    required: [true, '开始时间是必填项']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= this.startDate;
      },
      message: '结束时间不能早于开始时间'
    }
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    maxlength: [1000, '工作描述最多1000个字符']
  },
  achievements: [String]
}, { _id: true });

// 项目经历子模式
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '项目名称是必填项']
  },
  description: {
    type: String,
    required: [true, '项目描述是必填项'],
    maxlength: [500, '项目描述最多500个字符']
  },
  technologies: [String],
  url: {
    type: String,
    match: [/^https?:\/\/.+/, '请输入有效的URL']
  },
  github: {
    type: String,
    match: [/^https?:\/\/.+/, '请输入有效的GitHub URL']
  },
  startDate: Date,
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || !this.startDate || value >= this.startDate;
      },
      message: '结束时间不能早于开始时间'
    }
  },
  highlights: [String]
}, { _id: true });

// 技能子模式
const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, '技能分类是必填项'],
    enum: ['编程语言', '框架', '数据库', '工具', '软技能', '其他']
  },
  name: {
    type: String,
    required: [true, '技能名称是必填项']
  },
  level: {
    type: String,
    enum: ['初级', '中级', '高级', '专家'],
    default: '中级'
  },
  years: Number
}, { _id: true });

// 简历主模式
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '用户ID是必填项']
  },
  title: {
    type: String,
    required: [true, '简历标题是必填项'],
    trim: true,
    maxlength: [100, '简历标题最多100个字符']
  },
  
  // 个人信息
  personalInfo: {
    firstName: {
      type: String,
      required: [true, '姓是必填项']
    },
    lastName: {
      type: String,
      required: [true, '名是必填项']
    },
    email: {
      type: String,
      required: [true, '邮箱是必填项'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
    },
    phone: String,
    address: String,
    website: {
      type: String,
      match: [/^https?:\/\/.+/, '请输入有效的网站URL']
    },
    linkedin: {
      type: String,
      match: [/^https?:\/\/.+/, '请输入有效的LinkedIn URL']
    },
    github: {
      type: String,
      match: [/^https?:\/\/.+/, '请输入有效的GitHub URL']
    },
    avatar: String
  },
  
  // 职业概述
  summary: {
    type: String,
    maxlength: [800, '职业概述最多800个字符']
  },
  
  // 工作经历
  experiences: [experienceSchema],
  
  // 教育经历
  education: [educationSchema],
  
  // 项目经历
  projects: [projectSchema],
  
  // 技能
  skills: [skillSchema],
  
  // 语言能力
  languages: [{
    name: {
      type: String,
      required: [true, '语言名称是必填项']
    },
    level: {
      type: String,
      enum: ['初级', '中级', '高级', '母语'],
      default: '中级'
    }
  }],
  
  // 证书/奖项
  certifications: [{
    name: {
      type: String,
      required: [true, '证书名称是必填项']
    },
    issuer: String,
    date: Date,
    url: {
      type: String,
      match: [/^https?:\/\/.+/, '请输入有效的证书URL']
    },
    description: String
  }],
  
  // 模板设置
  template: {
    name: {
      type: String,
      default: 'modern'
    },
    colors: {
      primary: {
        type: String,
        default: '#2563eb'
      },
      secondary: {
        type: String,
        default: '#64748b'
      }
    },
    fonts: {
      heading: {
        type: String,
        default: 'Inter'
      },
      body: {
        type: String,
        default: 'Inter'
      }
    },
    layout: {
      type: String,
      enum: ['single-column', 'two-column', 'sidebar'],
      default: 'two-column'
    }
  },
  
  // 可见性设置
  isPublic: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // 统计信息
  viewCount: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 虚拟字段：全名
resumeSchema.virtual('personalInfo.fullName').get(function() {
  return `${this.personalInfo?.firstName || ''} ${this.personalInfo?.lastName || ''}`.trim();
});

// 索引
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ title: 'text', 'personalInfo.firstName': 'text', 'personalInfo.lastName': 'text' });

// 静态方法：根据用户ID获取简历
resumeSchema.statics.findByUserId = function(userId) {
  return this.find({ userId, isActive: true }).sort({ updatedAt: -1 });
};

// 实例方法：增加查看次数
resumeSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// 实例方法：增加下载次数
resumeSchema.methods.incrementDownloadCount = function() {
  this.downloadCount += 1;
  return this.save();
};

module.exports = mongoose.model('Resume', resumeSchema);