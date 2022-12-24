export const langGetter = () => {

    const langStorage = window.localStorage.getItem('i18n-lang')
    const lang = langStorage === null || langStorage === undefined ? 'en' : JSON.parse(langStorage)

    return lang
}