export const useGlobalCart = () => useState<object,null>('globalCart', () => null)

export const useCartProducts = () => useState<object,null>('cartProducts', () => null)

export const useCartInfo = () => useState<object,null>('cartInfo', () => null)

import {objToFormData} from "~/utils/objToFormData";
import {getApiUrl} from "~/composables/globalState";

// Конкретно корзина в корзине
export const getCartProducts = async () => {
    const API_URL = getApiUrl()
    const cartProducts = useCartProducts()

    await $fetch(`${API_URL}/get-cart-products`,{
        method: 'post',
        body: objToFormData({lang: 'en'})
    }).then(async (response) => {
        const cartInfo = useCartInfo()
        const globalCart = useGlobalCart()

        response.product = await setProductsChecks(response.product)

        if (!response?.product?.length) {
            globalCart.value = {
                count: 0,
                total: 0
            }
            cartInfo.value = null
            return false
        }
        await setGlobalCart(response.product)

        cartProducts.value = response.product
        setCartInfo()

        return response
    }).catch( async (e) => {
        console.log(e)
    })
}

// Мини-корзина, доступная везде
export const getGlobalCart = async () => {
    const API_URL = getApiUrl()
    const globalCart = useGlobalCart()
    const headers = useRequestHeaders(['cookie'])

    await $fetch(`${API_URL}/get-cart`,{
        headers: headers
    }).then((response) => {
        globalCart.value = response
        return response
    }).catch(async (e) => {
        console.log(e)
    })
    return true
}

// Самостоятельно пересчитываем все нужные стоимости для корзины
export const setCartInfo = () => {
    const cartInfo = useCartInfo()
    const cartProducts = useCartProducts()

    let availableStores = cartProducts.value.filter((el) => {
        return el.checkbox && !el.provider_disable
    })

    let info = {
        checkoutDisabled: true,
        total: 0,
        itemsCount: 0,
        itemsTotal: 0,
        itemsTotalOld: 0,
        totalDiscount: 0,
        discountPercent: 0,
        storesCount: availableStores.length,
        totalDeliveryPrice: 0,
    }

    for (let store in availableStores) {
        let available_products = availableStores[store].products.filter((el) => {
                return el.checkbox
            }
        )

        let total = 0

        for (let product of available_products) {
            info.itemsCount += +product.count
            info.itemsTotal += +product.count * +product.price
            total += +product.count * +product.price
            info.itemsTotalOld += +product.count * +product.oldprice
        }

        info.totalDeliveryPrice = info.itemsCount > 5 ? info.itemsCount * 100 : 0
        info.totalDiscount = info.itemsTotalOld - info.itemsTotal
        info.discountPercent = info.totalDiscount / info.itemsTotalOld * 100


        info.total = info.itemsTotal + info.totalDeliveryPrice
    }

    cartInfo.value = info
}

export const addToCart = async (product,minus = undefined) => {
    const API_URL = getApiUrl()
    const globalCart = useGlobalCart()

    await $fetch(`${API_URL}/add-to-cart`,{
        headers: useRequestHeaders(),
        method: 'post',
        body: objToFormData({product,minus})
    }).then((result) => {
        globalCart.value = result
        return result
    }).catch(async (e) => {
        console.log(e)
    })
}

export const deleteFromCart = async (product_id) => {
    const API_URL = getApiUrl()
    const url = `${API_URL}/del-from-cart`
    await $fetch(url,{
        method: 'post',
        body: objToFormData({productId: product_id})
    }).then(async () => {
        updateDisabledList(product_id)
        return true
    }).catch(async (e) => {
        console.log(e)
    })
}

export const changeProductQuantity = async (id,store,product,inc) => {
    const cartProducts = useCartProducts()
    let stores = cartProducts.value
    stores[store].products[product].count = +stores[store].products[product].count + inc
    let minus = !(inc > 0)
    minus ? await addToCart(id, true) : await addToCart(id)
    setCartInfo()
}

// Чекбокс
export const changeProductCheck = async (store, index) => {
    const cartProducts = useCartProducts()
    let stores = cartProducts.value
    stores[store].products[index].checkbox = !stores[store].products[index].checkbox;
    updateCheckboxState(stores[store].products[index].id, stores[store].products[index].checkbox)
    stores[store].checkbox = false
    for (let product of stores[store].products) {
        if(product.checkbox) stores[store].checkbox = true
    }
    cartProducts.value = stores
    setCartInfo()
}

// Включить чекбоксы у выключенных товаров
export const selectAllProducts = async (value) => {
    const cartProducts = useCartProducts()
    for (let store in cartProducts.value) {
        cartProducts.value[store].checkbox = value
        for(let product of cartProducts.value[store].products) {
            if (product.availble && product.price) {
                product.checkbox = value;
                updateCheckboxState(product.id, product.checkbox)
            }
        }
    }
    setCartInfo()
}

// Удаление только товаров с включенными чекбоксами
export const deleteSelected = async () => {
    const API_URL = getApiUrl()
    const url = `${API_URL}/del-from-cart`

    const cartProducts = useCartProducts()
    let toBeDeleted = []

    for (let store in cartProducts.value) {
        for(let product of cartProducts.value[store].products) {
            if (product.checkbox) {
                toBeDeleted.push($fetch(url,{
                    method: 'post',
                    body: objToFormData({productId: product.id})
                }).then(async () => {
                    updateDisabledList(product)
                    return true
                }).catch(async (e) => {
                    console.log(e)
                }))
            }
        }
    }

    await useAsyncData('delete-selected-products', async () => {
       return await Promise.all(toBeDeleted)
    }, { lazy: true })
    localStorage.removeItem('disabled_products')
    await getCartProducts()
}

// Обработка мини-корзины
export const setGlobalCart = (stores) => {
    const globalCart = useGlobalCart()
    let count = 0
    let total = 0
    let products = []
    for (let store of stores) {
        for (let product of store.products) {
            count++
            total += +product.count
            products.push({
                id: product.id,
                count: product.count
            })
        }
    }
    globalCart.value = {
        count,
        total,
        products
    }
}

// Установка чекбоксов после старта страницы
export const setProductsChecks = (stores) => {
    for (let store in stores) {
        stores[store].checkbox = false
        for(let product of stores[store].products) {
            product.checkbox = !(product.availble < 1 || product.price <= 0 || stores[store].provider_disable) && !isDisabledProduct(product.id);
            product.disabled = isDisabledProduct(product.id)
            if (!(product.availble < 1 || product.price <= 0 || stores[store].provider_disable) && !isDisabledProduct(product.id)) stores[store].checkbox = true
        }
        stores[store].disabled = stores[store].products.filter((el) => {return !el.disabled}).length === 0
    }
    return stores
}

const isDisabledProduct = (id) => {
    let disabled = JSON.parse(localStorage.getItem('disabled_products'))
    return disabled?.includes(id)
}

// Сохранение состояния чекбокса в localStorage
export const updateCheckboxState = (id, state) => {
    let disabled = JSON.parse(localStorage.getItem('disabled_products'))
    if (!disabled) disabled = []

    if (state && disabled?.includes(id)) {
        // чекбокс только что включили, в списке выключенных он есть, надо удалить из списка
        disabled.splice(disabled?.indexOf(id), 1)
    } else if (!state && !disabled?.includes(id)) {
        // чекбокс только что выключили, в списке выключенных его нет, надо добавить в список
        disabled.push(id)
    }

    localStorage.setItem('disabled_products', JSON.stringify(disabled))
}

// Удаляем из списка выключенных уже удалённые товары
const updateDisabledList = (deleted) => {
    let disabled = JSON.parse(localStorage.getItem('disabled_products'))
    if (!disabled?.length) return

    let newDisabled = []

    for(let i = 0; i < disabled.length; i++) {
        let product = findProductInCart(disabled[i])
        if (product?.id && product.id !== deleted) {
            newDisabled.push(disabled[i])
        }
    }
    localStorage.setItem('disabled_products', JSON.stringify(newDisabled))
}

const findProductInCart = (id) => {
    const cartProducts = useCartProducts()
    for(let store of cartProducts.value) {
        let product = store.products.find((el) => {
            return el.id === id
        })
        if (product) return product
    }
    return null
}