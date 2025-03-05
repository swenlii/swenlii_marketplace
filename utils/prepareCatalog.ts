// Обработка дерева каталога в удобный вид
export const prepareCatalog = (catalog, root = '/', parent = 0, type = 'catalog') => {
    if (!catalog?.length) return false
    let preparedCatalog = []
    for (let sub of catalog) {
        let preparedSub = {
            url: `${root}${type}/${sub.url}`,
            parent: +sub.parent_id || +parent,
            children: [...prepareCatalog(sub.children || [],root,+sub.parent_id || +parent) || [],
                       ...prepareCatalog(sub.classes || [],root,+sub.parent_id || +parent,'products') || []
            ]
        }
        preparedSub = {...sub,...preparedSub}
        delete preparedSub.classes
        if (!preparedSub.children.length) delete preparedSub.children
        preparedCatalog.push(preparedSub)
    }
    return preparedCatalog.sort((a, b) => +a.sort_order - +b.sort_order)
}

