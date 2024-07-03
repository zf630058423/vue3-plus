// import { isDevMode } from '@/utils/env'

// 缓存是否放在localstorage
export const isLocal = true

export const cacheEncrypt = {
  key: 'c!+S=*6A#%M-R.1t',
  iv: 'c!+S=*6A#%M-R.1t',
}

// 是否加密缓存，默认非开发环境加密
// export const enableStorageEncryption = !isDevMode()
export const enableStorageEncryption = true

// 缓存默认过期时间 7 天
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export const APP_COMMON_LOCAL_KEY = 'COMMON_LOCAL__KEY__'

export const APP_LOCAL_KEY = 'LOCAL__KEY__'

export const APP_SESSION_KEY = 'SESSION__KEY__'

export const APP_COOKIE_KEY = 'COOKIE__KEY__'

export const TOKEN_KEY = 'TOKEN__'

export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN__'

export const USER_INFO_KEY = 'USER__INFO__'

export const TENAMT_ID_KEY = 'TENAMT_ID__'

export const PERMISSIONS_KEY = 'PERMISSIONS__'

export const ORGANIZATIONS_KEY = 'ORGANIZATIONS__'

export const ROLES_KEY = 'ROLES_ID__'

export const MENUS_KEY = 'MENUS__'

export const THEME_KEY = 'THEME__'

export const LANG_KEY = 'LANG__'

export const COLLAPSE_KEY = 'COLLAPSE__'

// 系统所有状态
export const STATUS_KEY = 'STATUS__'
