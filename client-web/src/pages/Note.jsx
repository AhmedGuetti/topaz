import React, {useState, useEffect}from 'react'
import Header from '../components/Header/Header'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import topaz from '../api/topaz';
import validate from "./ValidateNote";
import Footer from '../components/Footer/Footer'

import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';


function Note() {
  Axios.defaults.withCredentials = true;
  let navigate = useNavigate();

const [notes, setNotes] = useState({});
const [errors, setErrors] = useState({});
const [User,setUser] = useState("");
const [subject, setSubject] = useState([]);



Axios.defaults.withCredentials = true;
const [loginStatus, setLoginStatus] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState();

useEffect(()=>{
  Axios.get("http://localhost:3005/login").then((response)=>{
    if (response.data.loggedIn == true){
      setLoginStatus(response.data.user.rows[0].username);
      setIsLoggedIn(response.data.loggedIn);
    }

    const fetchData = async () => {
      try {
        
        const res = await topaz.get(`/student/${response.data.user.rows[0].username}`);

        setUser(res.data.data.student);
        const resSub = await topaz.get(`/subjects/${res.data.data.student[0].major_id}`);
        setSubject(resSub.data.data.subject);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  })
},[]);

const handleChange = e =>{
    setNotes({
        ...notes,
        [e.target.name]: e.target.value
    })
};

const handleSubmit = e =>{
    e.preventDefault();
    setErrors(validate(notes));  
};

const save = () =>{
  let toSend = {};
  for (let i = 0; i < subject.length; i++) {
    toSend[subject[i].subject_id] = notes[subject[i].subject_id];
  }
  Axios.post(`http://localhost:3005/notes/${loginStatus}`, toSend)
  .then((response) => {
    console.log(response);
    if(response.status == 200){
      return navigate("/dashboard");
    }
    
});
}

  const listInputs = subject.map((item, key) =>
    <FormControl id={key}>
      <Input  key={key}
        type="text"
        name={item.subject_id}
        placeholder={item.subject_name}
        value={notes[item.subject_id]}
        onChange={handleChange}
        className={`${errors.USERNAME} ? "error" : "success"`}
        onBlur={handleSubmit}
        autoComplete="off"
      />
  </FormControl>

);

  return (
    <>
    <Header isLoggedIn={isLoggedIn}/>
    <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Enter your mark of the National exam</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                those mark are going to be permenent with this account please enter your correct marks
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>

              <Stack spacing={4}>
                {listInputs}
              </Stack>

              <Stack spacing={10} style={{marginTop: 20}}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={save}
                    >
                    save
                  </Button>
                </Stack>


            </Box>
          </Stack>
        </Flex>
        <Footer />
  </>
  )
}

export default Note;