import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

// app.json 路径
const appJsonPath = path.resolve(process.cwd(), 'app.json')
const options = { encoding: 'utf-8' }

// 添加 page
const addPage = page => {
  const re = /("pages":[\s\S]*")(\s*)(\],)/m
  const appJson = fs.readFileSync(appJsonPath, options)

  if (!page) return appJson

  return appJson.replace(re, (res, s1, s2, s3) => {
    return `${s1},${s2}${page}${s2.includes('\n') ? s2 + s3 : s3}`
  })
}

/**
 * 更新 app.json 的 pages 配置
 *
 * @param {*} page 模板名称，如："pages/demo/demo"
 */
const updateAppJson = page => {
  const appJsonStr = addPage(page)

  // 格式化
  const prettierStr = prettier.format(appJsonStr, { parser: 'json' })

  console.log(prettierStr)

  // 写文件
  fs.writeFileSync(
    appJsonPath,
    prettierStr,
    options
  )
}


export default updateAppJson