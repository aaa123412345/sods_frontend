import { faAlignLeft, faBook, faGamepad, faLocationDot, faTent } from "@fortawesome/free-solid-svg-icons";
import { faImages, faMap } from "@fortawesome/free-regular-svg-icons";

import TextInput from "../components/TourGuideCanvas/common/Inputs/TextInput/TextInput";
import ImageUploader from "../components/TourGuideCanvas/common/Inputs/ImageUploader/ImageUploader";
import DropDownList from "../components/TourGuideCanvas/common/Inputs/DropDownList/DropDownList";
import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";

import { updateBooth, updateFloorplan, updateStory, updateVR } from "../redux/form/form.action";

const tourModalData = [

    {

        index: 0,
        name: "Floor Plan",
        pages: [
            {
                heading: "heading-floorplan",
                components: [
          
                    {
                        index: 0,
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "label-region-name",
                            placeholder: {
                                zh: "1樓",
                                en: "1 Floor"
                            },
                            names: {
                                form: "floorplan",
                                field: "region",
                            },
                            update: (data) => updateFloorplan(data)
                        }
                    },
                    {
                        index: 1,
                        type: ImageUploader, 
                        props: {
                            faIcon: faMap,
                            label: "label-upload-map"
                        }
                    }
                           
                ]

            }
        ]
        
    },
    {
        index: 1, 
        name: "Booth",
        pages: [
            {
                heading: "heading-booth",
                components: [

                    {
                        index: 0,
                        type: TourGuideMap,
                        props: {
                            isAssignBooth: true,
                            isMarkable: false
                        }
                    },
                    {

                        index: 1,
                        type: TextInput,
                        props: {
                            faIcon: faTent,
                            label: "label-booth-name",
                            placeholder: {
                                zh: "數學攤位",
                                en: "Mathematic Booth"
                            },
                            names: {
                                form: "booth",
                                field: "name",
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 2,
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "label-venue",
                            names: {
                                form: "booth",
                                field: "venue",
                            },
                            placeholder: {
                                zh: "1樓, 101室, 1A 課室",
                                en: "1/F, Room 101, 1A Classroom"
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 3,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faAlignLeft,
                            label: "label-description",
                            names: {
                                form: "booth",
                                field: "description",
                            },
                            placeholder: {
                                zh: "這裏是學生平日學習數學的地方。",
                                en: "Students are always learning Maths here."
                            },
                            update: (data) => updateBooth(data)
                        }
                    }
                    
                ]
            },
        ]
    },
    {
        index: 2, 
        name: "Booth",
        pages: [
            {
                heading: "Where is Your Booth?",
                components: [
                    {

                        index: 0,
                        type: TourGuideMap, 
                        props: {
                            isMarkable: false, 
                            isAssignBooth: true
                        }
                    }
                ]
            },
        ]
    },
    {
        index: 3, 
        name: "Booth",
        pages: [
            {
                heading: "heading-booth",
                components: [

                    {

                        index: 1,
                        type: TextInput,
                        props: {
                            faIcon: faTent,
                            label: "label-booth-name",
                            placeholder: {
                                zh: "數學攤位",
                                en: "Mathematic Booth"
                            },
                            names: {
                                form: "booth",
                                field: "name",
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 2,
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "label-venue",
                            names: {
                                form: "booth",
                                field: "venue",
                            },
                            placeholder: {
                                zh: "1樓, 101室, 1A 課室",
                                en: "1/F, Room 101, 1A Classroom"
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 3,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faAlignLeft,
                            label: "label-description",
                            names: {
                                form: "booth",
                                field: "description",
                            },
                            placeholder: {
                                zh: "這裏是學生平日學習數學的地方。",
                                en: "Students are always learning Maths here."
                            },
                            update: (data) => updateBooth(data)
                        }
                    }
                    
                ]
            },
        ]
    },
    {

        index: 4,
        name: "Story",
        pages: [
            {
                heading: "heading-story",
                components: [
          
                    {
                        index: 0,
                        type: TextInput,
                        props: {
                            faIcon: faBook,
                            label: "label-story-title",
                            names: {
                                form: "story",
                                field: "title",
                            },
                            placeholder: {
                                zh: "第一天上學",
                                en: "First Day of School"
                            },
                            update: (data) => updateStory(data)
                        }
                    },
                    {
                        index: 1,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faAlignLeft,
                            label: "label-story-content",
                            names: {
                                form: "story",
                                field: "content",
                            },
                            placeholder: {
                                zh: "馬莉莉是個很害羞的學生，一天，陳老師建議他去……",
                                en: "Mary is a shy student; and one day, Miss Chan had suggested her to ..."
                            },
                            update: (data) => updateStory(data)
                        }
                    },
                    {
                        index: 2,
                        type: ImageUploader, 
                        props: {
                            faIcon: faImages,
                            label: "label-upload-cover"
                        }
                    }
                           
                ]

            }
        ]
        
    },
    {

        index: 5,
        name: "Delete",
        pages: [
            {
                heading: "heading-delete",
                components: []

            }
        ]
        
    },
    {
        index: 6, 
        name: "Booth",
        pages: [
            {
                heading: "heading-vr",
                components: [

                    {

                        index: 0,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faTent,
                            label: "label-vr-speech",
                            placeholder: {
                                zh: "大家好！今日我將會介紹…",
                                en: "Welcome everybody! Today I would like to introduce..."
                            },
                            names: {
                                form: "booth",
                                field: "speech",
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {
                        index: 1,
                        type: ImageUploader, 
                        props: {
                            faIcon: faMap,
                            label: "label-upload-360image"
                        }
                    }
                    
                ]
            },
        ]
    },

]

export default tourModalData;