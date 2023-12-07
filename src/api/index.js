import request from '@/utils/request'

export const get = function (url, params, access = true, refreshAccess = false) {
    return request({
        url,
        method: 'get',
        params: params,
        access,
        refreshAccess
    })
}
export const post = function (url, data, access = true, refreshAccess = false, isForm = false) {
    return request({
        url,
        method: 'post',
        data,
        access,
        refreshAccess,
        isForm
    })
}
export function fetchList (params) {
    console.log("fetch list")
    return get({
        url: '/post/list',
        params: params,
    })
}

export function fetchFocus () {
    return get({
        url: '/focus/list',
    })
}

export function fetchCategory () {
    return get({
        url: '/category',
    })
}

export function fetchFriend () {
    return get({
        url: '/friend',
    })
}

export function fetchSocial () {
    return get({
        url: '/social',
    });
}

export function fetchSiteInfo () {
    return get({
        url: '/site',
    })
}

export function fetchComment () {
    return get({
        url: '/comment',
    })
}
