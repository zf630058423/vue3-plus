import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { useUserStore } from '@/store/modules/user'
// import { useI18n } from '@/hooks/web/useI18n'

/**
 * 状态码: 401
 *   code：42001 无法访问认证服务器
 *   code：48012 身份验证失败
 *   code：48013 redis无法连接，登录失败
 *   code：50001 用户未登录
 *   code：51001 Token无效或过期
 *   code：52001 client_id或client_secret错误
 *   code：52002 账号错误
 *   code：52003 密码错误，请重新输入密码
 *   code：53001 不支持的授予类型
 *   code：60001 拒绝访问此资源，需要Token身份验证
 *   code：-1    系统繁忙，请重试
 *
 * 41113 缺失username参数
 * 41114 缺失grant_type参数
 *
 * 状态码: 200
 *   code：200   成功
 *   code：50002 用户未授权
 */

let baseURL = import.meta.env.VITE_BASE_URL

const service = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截 request
 */
service.interceptors.request.use(
  (config) => {
    // const { token, tenantId } = useUserStore()

    // token
    // if (config.token) {
    //   config.headers.Authorization = `Bearer ${config.token}`
    // } else if (token && !config.noToken && !config.url.startsWith('/user/oauth/token')) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // 租户id
    // if (tenantId && !config.noToken) {
    //   config.headers.tenantId = tenantId
    // }
    if (config.ContentType) {
      config.headers['Content-Type'] = config.ContentType
    }
    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false // 是否正在刷新的标记
let requestQueues = [] // 请求队列

/**
 * 响应拦截 response
 */
service.interceptors.response.use(
  (response) => {
    return response?.data
  },
  ({ response }) => {
    const { status, data } = response || {}
    const { refresh_token, refreshToken } = useUserStore()
    if (status === 401) {
      if (!data) {
        return tokenFailureTips()
      } else if (data?.code === 50001) {
        // 账号被挤掉
        return tokenFailureTips()
      } else if (data?.code === 51001) {
        // Token无效或过期
        const { config } = response
        if (!isRefreshing) {
          isRefreshing = true
          if (!refresh_token) {
            return tokenFailureTips()
          }

          // 尝试刷新token
          return retry(refreshToken)
            .then(() => {
              requestQueues.forEach((cb) => cb())
              requestQueues = []
              return Promise.resolve(service(config))
            })
            .catch((err) => {
              return tokenFailureTips()
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          return new Promise((resolve) => {
            requestQueues.push(() => {
              resolve(service(config))
            })
          })
        }
      } else {
        data?.message &&
          ElMessage({
            message: data.message,
            type: 'error',
            showClose: true,
          })
      }
    } else {
      let message
      switch (status) {
        case 404:
          message = '404 Not Found'
          break
        case 431:
          message = '431 Request Header Fields Too Large'
          break
        case 500:
          message = '服务器异常'
          break
        case 502:
          message = '服务器异常'
          break
        case 504:
          message = '网络超时'
          break
        default:
          message = data?.message
          break
      }
      message &&
        ElMessage({
          message,
          type: 'error',
          showClose: true,
        })
    }
  }
)

// 接口重复请求
const retry = (fn, times = 3) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let bool = false
    while (times--) {
      try {
        const res = await fn()
        bool = res.success
        break
      } catch (err) {
        if (times <= 0) {
          bool = false
        }
      }
    }
    bool ? resolve() : reject()
  })
}

// token失效提示
let tokenMessageBox = null
const tokenFailureTips = () => {
  // const { t } = useI18n()
  const { redirectToLogin } = useUserStore()
  if (!tokenMessageBox) {
    const elMessageBoxs = [...new Set(document.getElementsByClassName('el-overlay is-message-box'))]
    if (elMessageBoxs?.length) {
      elMessageBoxs.forEach((item) => {
        item.remove()
      })
    }

    tokenMessageBox = ElMessageBox.alert(`身份验证失效，请重新登录。`, '提示', {
      confirmButtonText: '确认',
      type: 'error',
      showClose: false,
      draggable: true,
      callback: () => {
        tokenMessageBox = null
        redirectToLogin()
      },
    })
  }
}

export default service
