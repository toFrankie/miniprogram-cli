const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const figlet = require('figlet')

// 酷炫文字
const successText = () => {
  const figletText = figlet.textSync('SUCCESS', {
    // font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  })
  console.log(figletText)
}

// inquirer 问题
const ask = () => {
  const questions = [
    {
      type: 'list',
      name: 'templateType',
      message: '请选择模板类型',
      choices: ['pages', 'components']
    },
    {
      type: 'input',
      name: 'templateName',
      message: '请输入模板名称',
      validate: value => {
        const re = /^[a-zA-Z_]+[0-9a-zA-Z_-]*$/ // 支持数字、字母、下划线以及中划线，且必须以字母或者-开头
        if (re.test(value)) {
          return true
        }
        return '模板名称命名支持字母、数组、下划线(_)以及中划线(-)，且首字母必须是字母或者下划线'
      }
    }
  ]
  return inquirer.prompt(questions)
}

// 读写模板
const writeFile = async (templateType, templateName) => {
  try {
    const encoding = 'utf-8'
    const fileType = ['js', 'json', 'wxml', 'wxss']
    const fileDir = path.resolve(__dirname, `../${templateType}`)
    const filePath = path.resolve(__dirname, `../${templateType}/${templateName}`)

    // 创建模板目录
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir)
    }
    fs.mkdirSync(filePath)

    // 创建 Page
    fileType.forEach(item => {
      const data = fs.readFileSync(
        path.resolve(__dirname, `templates/${templateType}/${templateType}.${item}`),
        {
          encoding
        }
      )

      fs.writeFileSync(
        path.resolve(__dirname, `../${templateType}/${templateName}/${templateName}.${item}`),
        data,
        {
          encoding
        }
      )

    })
    console.log(`\n🎉🎉🎉\n模板创建成功，位于：${templateType}/${templateName}/${templateName}`)
  } catch (e) {
    console.warn('模板创建失败：', e)
  }
}

const create = async () => {
  const { templateType, templateName } = await ask()
  await writeFile(templateType, templateName)
  successText()
}

create()