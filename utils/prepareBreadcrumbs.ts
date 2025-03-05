// Обработка пришедших крошек в вид [{title: 'foo',url: '/catalog/bar'}]
export const prepareBreadcrumbs = (items, isSliceLastBreadCrumbs) => {
    let array = []
    array.push({
        langTitle: 'Home',
        url: '/'
    })

    for (let item of items) {
        let newItem = {
            title: item.title
        }
        newItem.url = `/${item.type.replace('category','catalog').replace('class','products')}/${item.url}`
        array.push(newItem)
    }

    if (isSliceLastBreadCrumbs && array.length > 1) {
        array = array.slice(0, -1)
    }

    return array
}