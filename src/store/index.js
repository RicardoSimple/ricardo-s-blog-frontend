import Vue from 'vue'
import Vuex from 'vuex'
import { getTimeInterval } from '../utils/index'
import { fetchSocial, fetchSiteInfo } from '@/api'

// 使用vuex
Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: '',
    // token: null,//存token
    // refreshToken: null,//存refreshToken
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) => {
        state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
        state.refreshToken = refreshToken;
    },
}
const actions = {
    setLoading: ({ commit }, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({ commit }) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({ commit, state }) => {
        return new Promise(resolve => {
            if (state.websiteInfo) {
                resolve(state.websiteInfo)
            } else {
                fetchSiteInfo().then(res => {
                    let data = res.data || {}
                    commit('SET_SITE_INFO', data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    getSocials: ({ commit, state }) => {
        return new Promise((resolve => {
            if (state.socials) {
                resolve(state.socials)
            } else {
                fetchSocial().then(res => {
                    let data = res.data || []
                    commit('SET_SOCIALS', data);
                    resolve(data);
                }).catch(err => {
                    resolve([]);
                })
            }
        }))
    },
    // setToken: ({ commit }, token) => {
    //     commit('SET_TOKEN', token);
    // },
    // setRefreshToken: ({ commit }, refreshToken) => {
    //     commit('SET_REFRESH_TOKEN', refreshToken)
    // }
}
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo ? state.websiteInfo.notice : '',
    // getToken: state => state.token,
    // getRefreshToken: state => state.refreshToken,
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
