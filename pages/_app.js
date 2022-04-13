import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component/>
    </ChakraProvider>
  )
}

export default MyApp