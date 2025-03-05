import {getGlobalCart} from "~/composables/cartState";
import {getCatalogTree} from "~/composables/catalogState";
import {getInitialSession} from "~/composables/globalState";
import { createFetch } from 'ofetch'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()
    fetch['config'] = config

    const event = useRequestEvent()

    await useAsyncData('initialSession',() => getInitialSession(event))

    useAsyncData('getCatalogTree',getCatalogTree,{
        immediate: true,
        deep: true
    })

    useAsyncData('getGlobalCart',getGlobalCart)

    if (!process.env.IS_TEST) globalThis.$fetch = createFetch()
})
