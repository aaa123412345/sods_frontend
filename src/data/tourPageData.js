import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import ItemList from "../components/TourGuideCanvas/common/ItemList/ItemList";
import GameTicket from "../components/TourGuideCanvas/GameTicket/GameTicket";

const tourPageData = [

    {

        index: 0,
        page: 0,
        name: "Floor Plan Markers",
        components: [
            {
                type: TourGuideMap, 
                props: {
                    isAdmin: true, 
                    isMarkable: true
                }
            }
        ]
    },
    {

        index: 1,
        page: 1,
        name: "Booths",
        components: [
            {
                type: ItemList,
                props: {
                    isCategoryList: false,
                    isRegionFilter: true,
                    modalIndex: 1,
                    heading: "tourguide.booth",
                    path: "booths",
                    name: 'booth',
                    labelName: "name"
                }
            }
        ]
    },

    {

        index: 2,
        page: 2,
        name: "Ticket",
        components: [
            {
                type: GameTicket, 
                props: {
                    isPreviewMode: true
                }
            }
        ]
    },

]

export default tourPageData;