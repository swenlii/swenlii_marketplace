import {objToFormData} from "~/utils/objToFormData";
import {prepareCatalog} from "~/utils/prepareCatalog";
import {getApiUrl} from "~/composables/globalState";

export const useCatalogTree = () => useState('catalogTree', () => null)
export const useCatalogInfo = () => useState('catalogInfo', () => null)
export const useCatalogProducts = () => useState('catalogProducts', () => {})
export const useProductInfo = () => useState('productInfo', () => null)
export const useBreadCrumbs = () => useState('breadcrumbs', () => null)
export const useCatalogCount = () => useState('catalogCount', () => null)

export const getCatalogTree = async () => {
    const API_URL = getApiUrl()
    const route = useRoute()
    const catTree = useCatalogTree()

    const res = await $fetch.raw(`${API_URL}/get-catalog-tree`,{
        headers: useRequestHeaders(['cookie']),
        method: 'post',
        body: objToFormData({lang: 'en'})
    }).catch((e) => {
        console.log(e)
    })
    catTree.value = await prepareCatalog(res._data)
    return res._data
}