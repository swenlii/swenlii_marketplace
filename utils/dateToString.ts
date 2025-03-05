// Конвертирование даты вида "1737438966" в "21 Jan, 2025, 8:56 am"
export const dateToString = (date) => {
    const event = new Date(date * 1000)

    const options = { month: 'short', day: 'numeric', year: 'numeric' }

    let dateString = event.toLocaleDateString('en-US', options)

    // Меняем местами месяц и дату, так привычнее
    let dateArr = dateString.split(', ')
    dateString = dateArr[0].split(' ').reverse().join(' ') + ', ' + dateArr[1]

    return dateString + ', ' + getTime(event)
}

export const getTime = (timeStart) => {
    if (!timeStart) return '00:00'
    const event = new Date(timeStart)
    let time = event.toTimeString().slice(0, 8)

    let options = {
        timeZone: 'UTC',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }

    let h12 = new Date('1970-01-01T' + time + 'Z');

    h12 = `${new Date(h12).toLocaleTimeString('en-US',options)}`
    return h12.toLowerCase()
}