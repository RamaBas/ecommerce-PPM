import React from "react"
import { ChakraProvider, Container, VStack, Image, Heading, Text, Divider } from "@chakra-ui/react"
import { AppProps } from "next/dist/shared/lib/router/router"
import theme from "../theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container
        backgroundColor="white"
        boxShadow="md"
        marginY={4}
        maxWidth="container.xl"
        padding={4}
        borderRadius="sm">
          <VStack marginBottom={6}>
            <Image borderRadius={9999} src="//placehold.it/128x128"></Image>
            <Heading>Pensado para Motos</Heading>
            <Text>Pensado para vos</Text>
            <Divider marginY={6}></Divider>
          </VStack>
          <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default App