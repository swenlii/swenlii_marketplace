import {appendResponseHeader, H3Event} from "h3";

export const useModalState = () => useState<object>('modalState', () => {return {}})
export const useUsualMessage = () => useState('usualMessage', () => null)
export const useOrderInfo = () => useState('orderInfo', () => null)
export const useRouterHistory = () => useState('routerHistory', () => {return []})
export const useSessionUpdate = () => useState('lastSessionUpdate', () => 0)
export const useSessionCookie = () => useState('sessionCookie', () => null)

export const setModalState = (modal = null,val = true) => {
    const modalState = useModalState()
    if (modal) {
        modalState.value[modal] = val
    } else {
        modalState.value = {}
    }
}

export const getApiUrl = () => {
    const config = useRuntimeConfig()
    return process.server ? `${config.SERVER_URL}/api/v2` : `${config?.public.BASE_URL}/spaLayer/api/v2`
}

export const getInitialSession = async (event: H3Event) => {
    const API_URL = getApiUrl()
    const sessionCookie = useSessionCookie()
    const route = useRoute()

    const url = `${API_URL}/get-cookies`
    const res = await $fetch.raw(url,{
        headers: useRequestHeaders(['cookie'])
    }).catch((e) => {
        console.log(e)
        return false
    })

    if (process.server) {
        const cookies = (res.headers.get('set-cookie') || '').split(',')
        let cookiesList = []
        for (const cookie of cookies) {
            appendResponseHeader(event, 'set-cookie', cookie)
            if (cookie.includes('PHPSESSID') || cookie.includes('_schuid')) {
                cookiesList.push(cookie)
            }
        }
        sessionCookie.value = cookiesList.join(',')
    }

    return true
}





