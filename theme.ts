import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({ 
    colors:{
        primary: theme.colors["green"]
    },
    styles:{
        body:{
            backgroundColor:"primary.50"
        }
    }
})