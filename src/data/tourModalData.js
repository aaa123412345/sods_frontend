import { faA, faAlignLeft, faBook, faCalendar, faImage, faLocationDot, faMapLocation, faMapSigns, faPalette, faQ, faStamp, faTent, faVrCardboard } from "@fortawesome/free-solid-svg-icons";
import { faImages, faMap } from "@fortawesome/free-regular-svg-icons";

import { updateBooth, updateFloorplan, updateStory, updateBoothGame, updateARGame, updateConfigInput } from "../redux/form/form.action";

import TextInput from "../components/Common/common/Inputs/TextInput/TextInput";
import NumberInput from '../components/Common/common/Inputs/NumberInput/NumberInput'
import ImageUploader from '../components/Common/common/Inputs/ImageUploader/ImageUploader'
import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import TagInput from "../components/Common/common/Inputs/TagInput/TagInput";
import ItemList from "../components/Common/common/ItemList/ItemList";
import ColorPicker from "../components/Common/common/Inputs/ColorPicker/ColorPicker";
import DateTimePicker from "../components/Common/common/Inputs/DateTimePicker/DateTimePicker";
import DarkModeSwitcher from "../components/Common/common/Inputs/DarkModeSwitcher/DarkModeSwitcher";

export const tourModalData = {

    floorplan: {
        heading: "heading-floorplan",
        errorChecking: {
            regionEN: (value) => (value?.length ?? 0) <= 0,
            regionZH: (value) => (value?.length ?? 0) <= 0
        }, 
        components: [
            {
                type: TextInput,
                props: {
                    faIcon: faLocationDot,
                    label: "label-region-name",
                    placeholder: { zh: "1樓", en: "1 Floor"},
                    names: { form: "floorplan", field: "region" },
                    update: (data) => updateFloorplan(data)
                }
            },
            {
                type: ImageUploader, 
                props: { 
                    faIcon: faMapLocation, 
                    label: "label-upload-map",
                    names: { form: "floorplan", field: "imageUrl" },
                }
            }
        ]

    },   

    marker: {
        heading: "heading-where-booth",
        errorChecking: {
            floorPlanID: (value) => value === null || value === undefined,
            boothID: (value) => value === null || value === undefined,
            x: (value) => value === null || value === undefined,
            y: (value) => value === null || value === undefined,
        }, 
        components: [
            {
                type: TourGuideMap, 
                props: { isMarkable: false, isAssignBooth: true }
            },
        ]
    },

    vrTour: {
        heading: "heading-vr",
        errorChecking: {}, 
        components: [
            {
                type: ImageUploader, 
                props: { 
                    faIcon: faVrCardboard, 
                    label: "label-upload-360image",
                    names: { form: "booth", field: "vrImageUrl" },
                }
            }
        ]
    },

    booth: {
        heading: "heading-booth",
        errorChecking: {
            titleEN: (value) => (value?.length ?? 0) <= 0,
            titleZH: (value) => (value?.length ?? 0) <= 0,
            venueEN: (value) => (value?.length ?? 0) <= 0,
            venueZH: (value) => (value?.length ?? 0) <= 0,
            boothEN: (value) => (value?.length ?? 0) <= 0,
            boothZH: (value) => (value?.length ?? 0) <= 0,
            descriptionEN: (value) => (value?.length ?? 0) <= 0,
            descriptionZH: (value) => (value?.length ?? 0) <= 0,
        }, 
        components: [

            {
                type: TextInput,
                props: {
                    faIcon: faTent,
                    label: "label-booth-name",
                    placeholder: { zh: "數學攤位", en: "Mathematic Booth" },
                    names: { form: "booth", field: "title", },
                    update: (data) => updateBooth(data)
                }
            },
            {
                type: TextInput,
                props: {
                    faIcon: faLocationDot,
                    label: "label-venue",
                    names: { form: "booth", field: "venue", },
                    placeholder: { zh: "1樓, 101室, 1A 課室", en: "1/F, Room 101, 1A Classroom" },
                    update: (data) => updateBooth(data)
                }
            },
            {
                type: TextInput,
                props: {
                    isTextArea: true,
                    faIcon: faAlignLeft,
                    label: "label-description",
                    names: { form: "booth", field: "description", },
                    placeholder: { zh: "這裏是學生平日學習數學的地方。", en: "Students are always learning Maths here." },
                    update: (data) => updateBooth(data)
                }
            },
            {
                type: ImageUploader, 
                props: { 
                    faIcon: faImage, 
                    label: "label-upload-cover",
                    names: { form: "booth", field: "imageUrl" },
                }
            }
            
        ]
    },

    story: {

        heading: "heading-story",
        errorChecking: {
            titleEN: (value) => (value?.length ?? 0) <= 0,
            titleZH: (value) => (value?.length ?? 0) <= 0,
            contentEN: (value) => (value?.length ?? 0) <= 0,
            contentZH: (value) => (value?.length ?? 0) <= 0,
        }, 
        components: [
    
            {
                type: TextInput,
                props: {
                    faIcon: faBook,
                    label: "label-story-title",
                    names: { form: "story", field: "title", },
                    placeholder: { zh: "第一天上學", en: "First Day of School" },
                    update: (data) => updateStory(data)
                }
            },
            {
                type: TextInput,
                props: {
                    isTextArea: true,
                    faIcon: faAlignLeft,
                    label: "label-story-content",
                    names: { form: "story", field: "content",},
                    placeholder: { zh: "馬莉莉是個很害羞的學生，一天，陳老師建議他去……", en: "Mary is a shy student; and one day, Miss Chan had suggested her to ..." },
                    update: (data) => updateStory(data)
                }
            },
            {
                type: ImageUploader, 
                props: { 
                    faIcon: faImage, 
                    label: "label-upload-cover",
                    names: { form: "story", field: "imageUrl" },
                }
            }
                    
        ]

    },

    arTreasure: {

        heading: "heading-ar-game",
        errorChecking: {
            questionEN: (value) => (value?.length ?? 0) <= 0,
            questionZH: (value) => (value?.length ?? 0) <= 0,
            answers: (value) => JSON.parse(value ?? JSON.stringify([])).length <= 0
        }, 
        components: [
            {
                type: TextInput,
                props: {
                    isTextArea: true,
                    faIcon: faQ,
                    label: "label-ar-game-question", 
                    names: { form: "arGame", field: "question", }, 
                    placeholder: { zh: "本校的主要授課語言是甚麼？" , en: "What is the teaching language?" },
                    update: (data) => updateARGame(data)

                }
            }, 
            {
                type: TagInput,
                props: {
                    faIcon: faA,
                    label: "label-ar-game-answer", 
                    names: { form: "arGame", field: "answers", }, 
                    placeholder: { zh: "英文" , en: "English" },
                    update: (data) => updateARGame(data)
                }
            }
        ]

    },

    boothGame: {

        heading: 'heading-assign-game',
        errorChecking: {
            boothId: (value) => value === null || value === undefined, 
            gameId: (value) => value === null || value === undefined,
        }, 
        components: [
            {
                type: ItemList, 
                props: {
                    isInputList: true,
                    faIcon: faTent, 
                    label: "label-assign-booth-game",
                    names: { form: 'boothGame', field: 'boothId'},
                    update: (data) => updateBoothGame(data)
                }
            }
        ]

    },

    configs: {

        heading: 'heading-configs',
        errorChecking: null, 
        components: [
            {
                type: ColorPicker, 
                props: {
                    faIcon: faPalette, label: 'label-theme-color',
                    names: { form: 'configs', field: 'themeColor'},
                    update: (data) => updateConfigInput(data)
                }
            }, 
            {
                type: DateTimePicker, 
                props: {
                    faIcon: faCalendar, label: 'label-openday-date',
                    names: { form: 'configs', field: 'opendayDate'},
                    update: (data) => updateConfigInput(data)
                }
            }, 
            {
                type: NumberInput, 
                props: {
                    faIcon: faStamp, label: 'label-min-stamp', 
                    names: { form: 'configs', field: 'minStampNum'},
                    update: (data) => updateConfigInput(data)
                }
            }, 
            {
                type: DarkModeSwitcher,
                props:{}
            }
        ]

    }, 

    gameDataWarning: {

        heading: 'heading-game-data-warning',
        errorChecking: null, 
        components: null, 


    } 




}
