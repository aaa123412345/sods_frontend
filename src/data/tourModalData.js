import { faAlignLeft, faBook, faGamepad, faKey, faLocationDot, faTent } from "@fortawesome/free-solid-svg-icons";
import { faImages, faMap } from "@fortawesome/free-regular-svg-icons";

import TextInput from "../components/TourGuideCanvas/common/Inputs/TextInput/TextInput";
import ImageUploader from "../components/TourGuideCanvas/common/Inputs/ImageUploader/ImageUploader";
import NumberInput from "../components/TourGuideCanvas/common/Inputs/NumberInput/NumberInput";
import DropDownList from "../components/TourGuideCanvas/common/Inputs/DropDownList/DropDownList";
import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";

import { updateBooth, updateFloorplan, updateStory, updateGame } from "../redux/form/form.action";

const tourModalData = [

    {

        index: 0,
        name: "Floor Plan",
        pages: [
            {
                heading: "Your Floor Plan",
                components: [
          
                    {
                        index: 0,
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "Region Name",
                            placeholder: "1 Floor",
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
                            label: "Upload Floor Plan"
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
                heading: "Your Booth Details",
                components: [

                    {

                        index: 0,
                        type: TextInput,
                        props: {
                            faIcon: faTent,
                            label: "Booth Name",
                            placeholder: "Mathematic Booth",
                            names: {
                                form: "booth",
                                field: "name",
                            },
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 1,
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "Venue",
                            names: {
                                form: "booth",
                                field: "venue",
                            },
                            placeholder: "1/F, Rm 304, Computer Room",
                            update: (data) => updateBooth(data)
                        }
                    },
                    {

                        index: 2,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faAlignLeft,
                            label: "Description",
                            names: {
                                form: "booth",
                                field: "description",
                            },
                            placeholder: "This is the place for students to learn Maths.",
                            update: (data) => updateBooth(data)
                        }
                    },
                    {
                        index: 3,
                        type: NumberInput,
                        props: {
                            faIcon: faKey,
                            label: "Passcode",
                            names: {
                                form: "booth",
                                field: "passcode",
                            },
                            placeholder: 1234,
                            update: (data) => updateBooth(data)
                        }
                    },
                    
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
                heading: "Your Mini Game",
                components: [
        
                    {
                        index: 0,
                        type: DropDownList,
                        props: {
                            fetchTarget: {
                                name: "games",
                                type: "UPDATE_GAMES"
                            },
                            faIcon: faGamepad,
                            label: "Game Type",
                            defaultList: ["AR Treasure", "Greedy Snake", "Candy Crush"],
                            names: {
                                form: "game",
                                field: "gameType",
                            },
                            placeholder: "Select a Game Type ",
                            update: (data) => updateGame(data)
                        }
                    },
                    {
                        index: 1,
                        type: DropDownList,
                        props: {
                            fetchTarget: {
                                name: "games",
                                type: "UPDATE_GAMES"
                            },
                            faIcon: faGamepad,
                            label: "Available Game",
                            names: {
                                form: "booth",
                                field: "gameID",
                            },
                            placeholder: "Select a Game",
                            update: (data) => updateGame(data)
                        }
                    }
                    
                ]
            }
        ]
    },
    {

        index: 4,
        name: "Story",
        pages: [
            {
                heading: "Your Story",
                components: [
          
                    {
                        index: 0,
                        type: TextInput,
                        props: {
                            faIcon: faBook,
                            label: "Story Title",
                            names: {
                                form: "story",
                                field: "title",
                            },
                            placeholder: "A Day of School",
                            update: (data) => updateStory(data)
                        }
                    },
                    {
                        index: 1,
                        type: TextInput,
                        props: {
                            isTextArea: true,
                            faIcon: faAlignLeft,
                            label: "Story Content",
                            names: {
                                form: "story",
                                field: "content",
                            },
                            placeholder: "Mary is a shy student, and one day, Miss Chan had chatted with her about ...",
                            update: (data) => updateStory(data)
                        }
                    },
                    {
                        index: 2,
                        type: ImageUploader, 
                        props: {
                            faIcon: faImages,
                            label: "Upload Cover Image"
                        }
                    }
                           
                ]

            }
        ]
        
    },

]

export default tourModalData;