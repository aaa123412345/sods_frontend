const todayText = {
    en: "Today", 
    zh: "今天"
}

export const format_date = (date, lang) => {

    let day = date.getDay()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let dateDisplay = ""
    let today = new Date()
    if(day === today.getDay() && month === (today.getMonth() + 1) && year === today.getFullYear())
        dateDisplay += todayText[lang]

    let h = date.getHours() 
    h = h < 10 ? "0" + h : h
    let m = date.getMinutes() 
    m = m < 10 ? "0" + m : m
    let s = date.getSeconds()
    s = s < 10 ? "0" + s : s

    return `${dateDisplay} ${h}:${m}:${s}` 
}

export const get_current_time = (lang) => {
    return format_date(new Date(), lang)
}
