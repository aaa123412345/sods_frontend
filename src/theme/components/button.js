import { mode } from '@chakra-ui/theme-tools'

// shape and basic style

const fixedStyle = {

    margin: ".5em",
    boxShadow: '0px 0px 20px rgba(0, 0, 0, .2)',
    borderRadius: 25,
    borderWidth: '3px',
    borderStyle: "solid",
    borderColor: "transparent"

}

export const ButtonStyles = {

    // style object for base or default style
    baseStyled: {},
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants (“outline" , "solid")
    variants: {

        red: (props) => ({

            ...fixedStyle,
            bg: "red", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        redOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "red",
            borderColor: "red",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        blue: (props) => ({

            ...fixedStyle,
            bg: "blue", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        blueOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "blue",
            borderColor: "blue",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        green: (props) => ({

            ...fixedStyle,
            bg: "green", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        greenOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "green",
            borderColor: "green",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        orange: (props) => ({

            ...fixedStyle,
            bg: "orange", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        orangeOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "orange",
            borderColor: "orange",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        purple: (props) => ({

            ...fixedStyle,
            bg: "purple", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        purpleOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "purple",
            borderColor: "purple",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        pink: (props) => ({

            ...fixedStyle,
            bg: "pink", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        pinkOutline: (props) => ({

            ...fixedStyle,
            bg: "transparent", 
            color: "pink",
            borderColor: "pink",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

        gray: (props) => ({

            ...fixedStyle,
            bg: mode('gray.10', 'gray.100')(props), 
            color: mode("gray.100", 'gray.10')(props),
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),
        
        grayOutline: (props) => ({

            ...fixedStyle,
            bg: mode('gray.10', 'gray.100')(props), 
            color: mode("gray.100", 'gray.10')(props),
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),   
        
        danger: (props) => ({

            ...fixedStyle,
            bg: "danger", 
            color: "#FFF",
            _hover: {
                filter: mode('brightness(0.85)', 'brightness(1.15)')(props),
                transform: "scale(1.05)"
            }
            
        }),

    },
    // default values for 'size' and 'variant'
    defaultProps: {},

}