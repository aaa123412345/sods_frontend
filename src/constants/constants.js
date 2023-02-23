// common

export const tourHost = process.env.REACT_APP_TOURGUIDE_SYSTEM_HOST
export const arGameHost = process.env.REACT_APP_MINI_GAME_HOST
export const refreshTime = 60 * 1000 // 1 min
export const mobileBreakPoint = 48 * 16 // 46 em * 16 px (1em = 16px)

export const scrollbarCSS = {
    '&::-webkit-scrollbar': {
        height: '1px',
        borderRadius: '25px',
        backgroundColor: `rgba(0, 0, 0, 0)`,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, .5)`,
    },
}

export const monthDictionary = {

    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",                    
    4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 
    8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"

}

// vr tour

// export const introductionZH =  "大家好！我係導遊機械人，大家想聆聽導遊簡介可以點按相關問題一下。依家我將會介紹依個學校設施比大家。"
// export const introductionEN = "Hi, every visitors! I am tourguide robot. If you would like to listen to me more, please click on the question which you want to ask. Let's me introduce this school facility now."
// export const errorZH = "對唔住，中文版本嘅介紹仲準備緊，如果你唔介意嘅話，你可以暫時聽英文版本嘅介紹先。"
// export const errorEN = "Sorry, the English version of tourguide is preparing. You may listen to Cantonese first. "

export const modelFloatingAnim = {

    property: 'position',
    dur: 5000,
    dir: 'alternate',
    easing: 'easeInOutSine',
    loop: true,
    from: '0 0 -3',
    to: '.25 .25 -3'

}

// functional footer

export const submitLabel = {
    post: "create",
    put: "update",
    delete: "delete"
}

// modal

export const placeholderLang = {
    en: "English version: ",
    zh: "中文版本： "
}
