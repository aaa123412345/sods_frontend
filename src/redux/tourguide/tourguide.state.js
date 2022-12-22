export const initTourguideState = {

    page: 0,
    themeColor: "blue",
    language: 'zh',
    host: process.env.REACT_APP_TOURGUIDE_REST_HOST,
    // host: 'https://150fdc63-ebcf-489f-b8c1-5f868cc433e3.mock.pstmn.io/',
    regionIndex: 0,
    storyIndex: 0,
    floorplans: [],
    booths: [],
    games: [],
    storyProgress: 2,
    stories: [],
    isOpenScanner: false

}
