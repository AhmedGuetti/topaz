import React, { useState, useEffect } from 'react'
import topaz from '../api/topaz';
import './Register.css';
import { useNavigate } from "react-router-dom";

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'





function Major() {
    let navigate = useNavigate();
    const [major_id, setMid] = useState('');
    const handleClick = e =>{
        setMid(e.target.value);
        localStorage.setItem('major_id', e.target.value);
        return navigate("/resultanonym");
    };
    const [majors, setMajors] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await topaz.get('/majors');
            setMajors(response.data.data.majors);
        }catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, []);

    const listMajor = majors.map((item, key) =>
        <button key={key} onClick={handleClick} value={item.major_id} style={{display: 'block'}}>{item.major_name}</button>
    );
  return (
    <>
        <Header />
        <div>Major</div>
            {listMajor}
        <Footer />
    </>
  )
}

export default Major;