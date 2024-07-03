import request from '@/utils/request'
import { ElMessage } from 'element-plus'

/* 通过url直接下载 */
export const exportByLink = ({ url }) => {
  if (!url) return
  const downloadLink = document.createElement('a')
  downloadLink.style.display = 'none'
  downloadLink.href = url
  document.body.appendChild(downloadLink)
  downloadLink.click() // 点击下载
  document.body.removeChild(downloadLink) // 下载完成移除元素
}

/* 导出excel */
export const exportHandler = async ({ url, data, fileName, callback }) => {
  if (!url) return

  const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const FILENAME_REGEX = /^["](.*)["]$/g

  const response = await request({
    url,
    data: data || {},
    method: 'POST',
    responseType: 'blob',
  })

  if (response?.type === MIME_TYPE) {
    const blob = new Blob([response], {
      type: MIME_TYPE,
    })

    const downloadLink = document.createElement('a')
    downloadLink.style.display = 'none'
    downloadLink.href = window.URL.createObjectURL(blob)
    downloadLink.download = decodeURI((fileName || 'excel').replace(FILENAME_REGEX, '$1')) // 下载后文件名
    document.body.appendChild(downloadLink)
    downloadLink.click() // 点击下载
    document.body.removeChild(downloadLink) // 下载完成移除元素
    window.URL.revokeObjectURL(downloadLink.href)

    if (typeof callback === 'function') {
      callback()
    }
  } else {
    try {
      const reader = new FileReader()
      const text = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsText(response)
      })
      const jsonData = JSON.parse(text)
      return ElMessage({
        message: jsonData?.message || '导出失败',
        type: 'error',
        showClose: true,
      })
    } catch (err) {
      // 解析对象失败，说明是正常的文件流
      return
    } finally {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }
}

/**
 * @description 文件服务器通用下载方法，接口需返回流数据
 * @param url 下载路径
 * @param data 参数
 * @param bucketName 桶名
 * @param fileId 文件id
 * @param fileName 文件名称
 */
export const downloadHandler = async ({ url, data, bucketName, fileId, fileName, callback }) => {
  let formData
  if (data) {
    formData = data
  } else {
    formData = new FormData()
    formData.append('bucketName', bucketName)
    formData.append('fileName', fileId)
  }

  const streamData = await request({
    url: url || `/erp/api/attachment/download`,
    ContentType: 'multipart/form-data',
    responseType: 'blob',
    method: 'post',
    data: formData,
  })

  const reader = new FileReader()
  const text = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(streamData)
  })

  try {
    const jsonData = JSON.parse(text)
    if (!jsonData?.success) {
      ElMessage({
        message: jsonData?.message || '下载失败',
        type: 'error',
        showClose: true,
      })
    }
  } catch {
    const link = document.createElement('a')
    const blob = new Blob([streamData])
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  } finally {
    if (typeof callback === 'function') {
      callback()
    }
  }
}
