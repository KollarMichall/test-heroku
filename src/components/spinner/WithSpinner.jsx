import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

const WithSpinner = WrappedComponent => ({ isLoading, ...props }) => {
    return isLoading ? (
        <Center h={'80vh'} >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Center>
    ) : (
        <WrappedComponent {...props} />
    )
}

export default WithSpinner