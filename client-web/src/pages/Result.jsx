import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import {
  Flex,
  Stack,
  useColorModeValue,
  Text,
  Heading,
} from '@chakra-ui/react';


import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


function Result() {
  
  const { state } = useLocation();
  return (
    <>
      <Header/>    
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Results : </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
            You have a chance of {state.smi}% in SMI
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
            You have a chance of {state.sma}% in SMA
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
            You have a chance of {state.smpc}% in SMPC
            </Text>
          </Stack>
        </Stack>
      </Flex>
    <Footer />
  </>
  )
}

export default Result