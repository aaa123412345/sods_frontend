import { faA, faAlignLeft, faBook, faImage, faLocationDot, faMapLocation, faMapSigns, faQ, faTent, faVrCardboard } from "@fortawesome/free-solid-svg-icons";
import { faImages, faMap } from "@fortawesome/free-regular-svg-icons";

import { updateBooth, updateFloorplan, updateStory, updateBoothGame, updateARGame } from "../redux/form/form.action";

import TextInput from "../components/Common/common/Inputs/TextInput/TextInput";
import ImageUploader from '../components/Common/common/Inputs/ImageUploader/ImageUploader'
import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import TagInput from "../components/Common/common/Inputs/TagInput/TagInput";
import ItemList from "../components/Common/common/ItemList/ItemList";

export const tourModalData = {

    floorplan: {
        heading: "heading-floorplan",
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
        components: [
            {
                type: TourGuideMap, 
                props: { isMarkable: false, isAssignBooth: true }
            },
        ]
    },

    vrTour: {
        heading: "heading-vr",
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

    }



}
