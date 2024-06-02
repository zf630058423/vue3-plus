import { defineStore } from "pinia";

export const menuStore = defineStore('menu', {
  state: () => {
    return {
      menu: {
        name: '组件',
        url: '',
        level: '',
      }
    }
  },
  getters: {
    getMenuName(state) {
      return state.menu.name
    }
  },
  actions: {
    menuVuex(data) {
      this.menu = data
    }
  }
})