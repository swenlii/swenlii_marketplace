// Конвертируем object в formData
export const objToFormData = (obj) => {
    let formData = new FormData()
    for (let key in obj ) {
        if (typeof(obj[key]) !== 'undefined') formData.append(key, obj[key])
    }
    return formData
}