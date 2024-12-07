// initial state
import { StoreOptions } from "vuex";

/**
 * state: 存储的状态信息， 如用户信息
 * mutation(尽量作为同步): 定义了对变量增删改的方法
 * actions: 执行**异步操作**，并且触发mutation的更改（actions 调用 mutation）
 */
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: "notLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      //todo 改成远程登录 从远程请求获取登录信息
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
