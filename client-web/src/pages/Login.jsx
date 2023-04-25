import React, { useState, useEffect } from 'react'
import Axios from "axios";
import validate from "./ValidateInfoLogin";
import { useNavigate } from "react-router-dom";


import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';



import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Login(){
  if(localStorage.getItem('isLoggedIn') == null)
    localStorage.setItem('isLoggedIn', false);

  
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    USERNAME: '',
    PASSWORD: '',
  });
  const [isLogged, setIsLogged] = useState();
  
  
  const [errors, setErrors] = useState({});
  const handleChange = e =>{
      setInputs({
          ...inputs,
          [e.target.name]: e.target.value
      })
  };
  
  const handleSubmit = e =>{
      e.preventDefault();
      setErrors(validate(inputs));  
  };
    Axios.defaults.withCredentials = true;
      const login = () =>{
        Axios.post("http://localhost:3005/login", {
          USERNAME: inputs.USERNAME,
          PASSWORD: inputs.PASSWORD,
      }).then((response) => {
          if (response.data.message) {
            localStorage.setItem('message', response.data.message);
          } else {
             return navigate("/notes");
          }
      });
      }
  
      useEffect(()=>{
        Axios.get("http://localhost:3005/login").then((response)=>{
          console.log(response.data);
          if (response.data.loggedIn == true) {
            localStorage.setItem('isLoggedIn', true);
            setIsLogged(response.data.loggedIn);
            return navigate("/");
          } 
        })
      },[]);




  
        useEffect(() => {
          localStorage.setItem('username', JSON.stringify(inputs.USERNAME));
        }, [inputs]);
    return (
    <>
      <Header isLoggedIn={isLogged}/>
  
      <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>

              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input    type="text"
                            name="USERNAME"
                            placeholder="User Name *"
                            value={inputs.USERNAME}
                            onChange={handleChange}
                            className={`${errors.USERNAME} ? "error" : "success"`}
                            onBlur={handleSubmit}
                            autoComplete="off"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input  type="password"
                          name="PASSWORD"
                          placeholder="Password *"
                          value={inputs.PASSWORD}
                          onChange={handleChange}
                          className={`${errors.PASSWORD} ? "error" : "success"`}
                          onBlur={handleSubmit}
                          autoComplete="off" 
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={login}
                    >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <Footer />
    </>

    )
}
