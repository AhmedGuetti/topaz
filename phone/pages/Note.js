import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../componenet/Header'
import topaz from '../api/topaz';
import Axios from "axios";
import { TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';





class Fuzzy{
  constructor(Cons){
      this.Cons = Cons;
  }
  func(point1, point2, x){
      let res = {
          a: 0,
          b: 0
      }
      res.a = (point1.y-point2.y)/(point1.x-point2.x);
      res.b = point1.y-res.a * point1.x;
     return res.a*x+res.b;
  }
  subject(x){
      if(this.Cons == null || x < 0) return null;
      if(x == 0){
          return {
              Null: 1,
              Faible: 0,
              Moyen: 0,
              ABien: 0,
              Bien:0,
          };
      }
      if (x >= 0 && x <= this.Cons[0])
      return {
          Null: 1,
          Faible: 0,
          Moyen: 0,
          ABien: 0,
          Bien:0,
      };
      else if (x > this.Cons[0] && x < this.Cons[1])
      return {
          Null: 1,
          Faible: this.func({x:this.Cons[0],y:1},{x:this.Cons[1],y:0},x),
          Moyen:  this.func({x:this.Cons[0],y:0},{x:this.Cons[1],y:1},x),
          ABien: 0,
          Bien:0,
      };
      else if (x >= this.Cons[1] && x <= this.Cons[2])
      return {
          Null: 0,
          Faible: 0,
          Moyen: 1,
          ABien: 0,
          Bien:0,
      };
      else if (x > this.Cons[2] && x < this.Cons[3])
      return {
          Null: 0,
          Faible: 0,
          Moyen: this.func({x:this.Cons[2],y:1},{x:this.Cons[3],y:0},x),
          ABien: this.func({x:this.Cons[2],y:0},{x:this.Cons[3],y:1},x),
          Bien:0,
      };
      else if (x >= this.Cons[3] && x <= this.Cons[4])
      return {
          Null: 0,
          Faible: 0,
          Moyen: 0,
          ABien: 1,
          Bien:0,
      };
      else if (x > this.Cons[4] && x < this.Cons[5])
      return {
          Null: 0,
          Faible: 0,
          Moyen: 0,
          ABien: this.func({x:this.Cons[4],y:1},{x:this.Cons[5],y:0},x),
          Bien: this.func({x:this.Cons[4],y:0},{x:this.Cons[5],y:1},x),
      };
      else
      return {
          Null: 0,
          Faible: 0,
          Moyen: 0,
          ABien: 0,
          Bien:1,
      };
  }
}

function Note({navigation, route}) {

  Axios.defaults.withCredentials = true;
  const mid = route.params.major_id;

const [notes, setNotes] = useState({});
const [subject, setSubject] = useState([]);
const [reglessmi, setReglessmi] = useState([]);
const [reglessma, setReglessma] = useState([]);
const [reglessmpc, setReglessmpc] = useState([]);
const [result, setResult] = useState({
    smi: 0,
    sma: 0,
    smpc: 0
})





useEffect(() => {
  const fetchData = async () => {
    try {
      const resSub = await topaz.get(`/subjects/${mid}`);
      setSubject(resSub.data.data.subject);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
  try {
      const response = await topaz.get(`/regles/${mid}/1`);
      setReglessmi(response.data.data.regles);
  }catch (err) {
      console.log(err);
  }
  };
  fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
  try {
      const response = await topaz.get(`/regles/${mid}/2`);
      setReglessma(response.data.data.regles);
  }catch (err) {
      console.log(err);
  }
  };
  fetchData();
}, []);


useEffect(() => {
  const fetchData = async () => {
  try {
      const response = await topaz.get(`/regles/${mid}/3`);
      setReglessmpc(response.data.data.regles);
  }catch (err) {
      console.log(err);
  }
  };
  fetchData();
}, []);



const Defuzz = (arr, matha, physica)=>{
  let preRes = [];
   
  arr.forEach((rule, key)=>{
      let weight = Math.min(matha[rule.mathmatiques.trim()], physica[rule.physiques.trim()]);
      
      if(rule.result.trim() == 'A.Bien')preRes[key] = {ABien: weight};
      else if(rule.result.trim() == 'Moyen')preRes[key] = {Moyen: weight};
      else if(rule.result.trim() == 'Bien')preRes[key] = {Bien: weight};
      else if(rule.result.trim() == 'Faible')preRes[key] = {Faible: weight};
      else if(rule.result.trim() == 'Null')preRes[key] = {Null: weight};
      } 
  );


  let ABien = 0;
  let Moyen = 0;
  let Bien = 0;
  let Faible = 0;
  let Null = 0;
  preRes.forEach((result)=>{
      const resKey = Object.keys(result)[0];
      const resVal = Object.values(result)[0];
      if (result && resKey && resVal) {
          if(resKey == 'ABien') ABien += resVal;
          else if(resKey == 'Moyen') Moyen += resVal;
          else if(resKey == 'Faible') Faible += resVal;
          else if(resKey == 'Bien') Bien += resVal;
          else if(resKey == 'Null') Null += resVal;
      }
  });
  var perc = 0;
  if((ABien+Moyen+Faible+Bien) == 0 || Null != 0) perc = 0;
  else perc = (ABien*75+Moyen*50+Faible*25+Bien*100)/(ABien+Moyen+Faible+Bien);

  return perc;

};


const save = () =>{
  
  // Fuzzy Logic
const math = notes[1]; 
const physic  = notes[3];
const fuzzyMath = new Fuzzy([6,10,13,15,16,18]);
const fuzzyPhysic = new Fuzzy([6,10,13,15,16,18]);

let matha = fuzzyMath.subject(math);
let physica = fuzzyPhysic.subject(physic);


setResult({
   smi: Defuzz(reglessmi,matha, physica),
   sma: Defuzz(reglessma,matha, physica),
   smpc: Defuzz(reglessmpc,matha, physica)
});
let resulta = JSON.stringify({
  smi: Defuzz(reglessmi,matha, physica),
  sma: Defuzz(reglessma,matha, physica),
  smpc: Defuzz(reglessmpc,matha, physica)
})

_storeData = async () => {
  try {
    await AsyncStorage.setItem('resulta', resulta);
  } catch (error) {
    console.log(error);
    navigation.navigate('Majors');
  }
};

_storeData();

navigation.navigate('Result');


};


const handleSubmit = e =>{
  e.preventDefault();
};

const listInputs = subject.map((item, ke) =>
    <TextInput
        key={ke}
          placeholder={item.subject_name}
          value={notes[item.subject_id]}
          onChangeText={(f)=>{
            setNotes({
              ...notes,
              [item.subject_id]: f
          })
          console.log(notes);
          }}
          onBlur={handleSubmit}
          style={{marginBottom: 10}}
        />
);



  return (
    <SafeAreaView>
      <Header title="Note"/>
      <ScrollView style={styles.scrollView}>
      <View style={{flex: 1}}>
        {listInputs}
        <Button
          icon="check"
          mode="contained"
          onPress={save}
        >
              Calculate result
      </Button>
      </View>
    </ScrollView>
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    marginTop:20
  },
  text: {
    fontSize: 42,
  },
});
export default Note;