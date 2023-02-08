import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import ItemList from "../components/TourGuideCanvas/common/ItemList/ItemList";
import StorySplider from "../components/TourGuideCanvas/StorySplider/StorySplider";

export const tourEditorData = {

    floorplans: {
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

    booths: {
        components: [
            {
                type: ItemList,
                props: {
                    dataName: "booths",
                    isCategoryList: false,
                    modalIndex: 1,
                    heading: "tourguide.booth",
                    path: "booths",
                    name: 'booth'
                }
            }
        ]
    }, 

    stories: {
        components: [
            {
                type: StorySplider, 
                props: {
                    isPreviewMode: true
                }
            }
        ]
    }

}
