import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from './components/button'


const config = {

    initialColorMode: 'light',
    useSystemColorMode: true,

}

export const newTheme = extendTheme({

    ...config,

    colors: {
        red: "#ee5353",
        blue: "#54a0ff",
        green: "#00d2d3",
        orange: "#ff9f43",
        purple: "#5f27cd",
        pink: "#f368e0",
        gray: {
            10: "#FFF",
            100: "#3d3a50"
        },
        white: "#f5f5f5",
        black: "#303041",
        success: "#43d787", 
        error: "#f9461c",
        danger: "#f9461c",
        warning: "#ffbb00",
        info: "#0186d6"
    },

    components: {
        Button,
        
    }

})