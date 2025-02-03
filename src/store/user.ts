// initial state
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import AccessEnum from "@/access/accessEnum";

/**
 * state: 存储的状态信息， 如用户信息
 * mutation(尽量作为同步): 定义了对变量增删改的方法
 * actions: 执行**异步操作**，并且触发mutation的更改（actions 调用 mutation）
 */
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "NO_LOGIN",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
    async logout({ commit, state }, payload) {
      await UserControllerService.userLogoutUsingPost();
      commit("logout_user");
    },
  },
  mutations: {
    updateUser(state, payload) {
      Object.assign(state.loginUser, payload);
    },
    logout_user(state) {
      state.loginUser.userName = "NO_LOGIN";
    },
  },
} as StoreOptions<any>;
