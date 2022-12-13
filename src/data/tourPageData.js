import TourGuideMap from "../components/TourGuideCanvas/TourGuideComponents/TourGuideMap/TourGuideMap";
import ItemList from "../components/TourGuideCanvas/TourGuideComponents/ItemList/ItemList";

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

        index: 0,
        page: 0,
        name: "Booths",
        components: [
            {
                type: ItemList,
                props: {
                    isCategoryList: false,
                    isRegionFilter: true,
                    modalIndex: 1,
                    heading: "Booth(s)",
                    path: "booths",
                    name: 'booth',
                    labelName: "name"
                }
            }
        ]
    },

]

export default tourPageData;