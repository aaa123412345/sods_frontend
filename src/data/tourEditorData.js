import TourGuideMap from "../components/TourGuideCanvas/TourGuideMap/TourGuideMap";
import StorySplider from "../components/TourGuideCanvas/StorySplider/StorySplider";
import ItemList from "../components/Common/common/ItemList/ItemList";
import BoothInspector from '../components/TourGuideCanvas/TourGuideEditor/BoothInspector/BoothInpector'
import { tourHost } from "../constants/constants";

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
                    host: tourHost,
                    method: 'post',
                    path: "booths",
                    name: 'booth', 
                    modalName: "booth"
                }
            }, 
            {
                type: BoothInspector,
                props: {  }
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
