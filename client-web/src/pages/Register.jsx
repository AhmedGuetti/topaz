import React, { useState, useEffect } from 'react'
import Axios from "axios";
import validate from "./ValidateInfo";
import './Register.css';
import { useNavigate } from "react-router-dom";

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import topaz from '../api/topaz';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export default function Register () {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    USERNAME: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    PASSWORD: '',
    MNAME:''
});
  const [errors, setErrors] = useState({});

const handleChange = e =>{
    setInputs({
        ...inputs,
        [e.target.name]: e.target.value
    })
};

const [majors, setMajors] = useState([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await topaz.get('/majors');
        setMajors(response.data.data.majors);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



const handleSubmit = e =>{
    e.preventDefault();
    setErrors(validate(inputs));  
};
    const getKeyMajor = ()=>{
      for(let major =0; major < majors.length; ++major){
          if(majors[major].major_name.trim() == inputs.MNAME.trim()){ 
            return majors[major].major_id;

          }
      }
  }
  Axios.defaults.withCredentials = true;
    const register = () =>{
      Axios.post("http://localhost:3005/register", {
        FIRST_NAME: inputs.FIRST_NAME,
        LAST_NAME: inputs.LAST_NAME,
        USERNAME: inputs.USERNAME,
        PASSWORD: inputs.PASSWORD,
        MID: getKeyMajor(inputs.MNAME)
    }).then((response) => {
        console.log(response);
        if(response.status == 200){
          return navigate("/login");
        }
        
    });
    }
    const listMajor = majors.map((item, key) =>
      <option key={key} value={item.major_name}>{item.major_name}</option>
    );
    const [showPassword, setShowPassword] = useState(false);

    return( 
      <>
        <Header/>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input 
                   type="text"
                   name="FIRST_NAME"
                   placeholder="First Name (in english)*"
                   value={inputs.FIRST_NAME}
                   onChange={handleChange}
                   className={`${errors.FIRST_NAME} ? "error" : "success"`}
                   onBlur={handleSubmit}
                   autoComplete="off"/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input    
                    type="text"
                    name="LAST_NAME"
                    placeholder="Last Name (in english)*"
                    value={inputs.LAST_NAME}
                    onChange={handleChange}
                    className={`${errors.LAST_NAME} ? "error" : "success"`}
                    onBlur={handleSubmit}
                    autoComplete="off" 
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Usename</FormLabel>
              <Input
                type="text"
                name="USERNAME"
                placeholder="User Name *"
                value={inputs.USERNAME}
                onChange={handleChange}
                className={`${errors.USERNAME} ? "error" : "success"`}
                onBlur={handleSubmit}
                autoComplete="off"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  name="PASSWORD"
                  placeholder="Password *"
                  value={inputs.PASSWORD}
                  onChange={handleChange}
                  className={`${errors.PASSWORD} ? "error" : "success"`}
                  onBlur={handleSubmit}
                  autoComplete="off"
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>


            <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  name="PASSWORD2"
                  placeholder="Confirm Password *"
                  value={inputs.PASSWORD2}
                  onChange={handleChange}
                  className={`${errors.PASSWORD2} ? "error" : "success"`}
                  onBlur={handleSubmit}
                  autoComplete="off"
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
            <Select placeholder='Select a major' name="MNAME" onChange={handleChange}>
              {listMajor}
            </Select>
            </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={register}
                >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

    <Footer />
  </>
  )

}