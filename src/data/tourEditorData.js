import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import StorySplider from "../components/TourGuideCanvas/StorySplider/StorySplider";
import ItemList from "../components/Common/common/ItemList/ItemList";

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
