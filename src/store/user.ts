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
      userName: "未登录",
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
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
