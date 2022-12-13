import { faAlignLeft, faGamepad, faKey, faLocationDot, faTent } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import TextInput from "../components/TourGuideCanvas/TourGuideComponents/Inputs/TextInput/TextInput";
import ImageUploader from "../components/TourGuideCanvas/TourGuideComponents/Inputs/ImageUploader/ImageUploader";
import NumberInput from "../components/TourGuideCanvas/TourGuideComponents/Inputs/NumberInput/NumberInput";
import DropDownList from "../components/TourGuideCanvas/TourGuideComponents/Inputs/DropDownList/DropDownList";
import TourGuideMap from "../components/TourGuideCanvas/TourGuideComponents/TourGuideMap/TourGuideMap";

const tourModalData = [

    {

        index: 0,
        name: "Floor Plan",
        assignRequests: null,
        pages: [
            {
                heading: "Your Floor Plan",
                components: [
          
                    {
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "Region Name",
                            names: {
                                form: "floorplan",
                                field: "region",
                            },
                            placeholder: "1 Floor",
                            updateType: "UPDATE_FLOORPLAN"
                        }
                    },
                    {
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
        assignRequests: null,
        pages: [
            {
                heading: "Your Booth Details",
                components: [

                    {
                        type: TextInput,
                        props: {
                            faIcon: faTent,
                            label: "Booth Name",
                            names: {
                                form: "booth",
                                field: "name",
                            },
                            placeholder: "Mathematic Booth",
                            updateType: "UPDATE_BOOTH"
                        }
                    },
                    {
                        type: TextInput,
                        props: {
                            faIcon: faLocationDot,
                            label: "Venue",
                            names: {
                                form: "booth",
                                field: "venue",
                            },
                            placeholder: "1/F, Rm 304, Computer Room",
                            updateType: "UPDATE_BOOTH"
                        }
                    },
                    {
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
                            updateType: "UPDATE_BOOTH"
                        }
                    },
                    {
                        type: NumberInput,
                        props: {
                            faIcon: faKey,
                            label: "Passcode",
                            names: {
                                form: "booth",
                                field: "passcode",
                            },
                            placeholder: 1234,
                            updateType: "UPDATE_BOOTH"
                        }
                    },
                    
                ]
            },
        ]
    },
    {
        index: 2, 
        name: "Booth",
        assignRequests: null,
        pages: [
            {
                heading: "Where is Your Booth?",
                components: [
                    {
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
        assignRequests: null,
        pages: [
            {
                heading: "Your Mini Game",
                components: [
        
                    {
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
                            updateType: "UPDATE_GAME"
                        }
                    },
                    {
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
                            updateType: "UPDATE_GAME"
                        }
                    }
                    
                ]
            }
        ]
    }

]

export default tourModalData;