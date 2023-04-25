import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import Header from '../componenet/Header'
import * as SQLite from 'expo-sqlite';
import * as FileSystem  from 'expo-file-system'
import { Asset } from 'expo-asset'

async function openDb() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../assets/www/topaz.db")).uri,
    FileSystem.documentDirectory + "SQLite/topaz.db"
  );
  return SQLite.openDatabase("topaz.db","1.0");
}

function Contact() {
  const [major, setMajor] = useState([]);
  const [major_id, setMid] = useState('');


  useEffect(() => {
    
    openDb().then(db=>db.transaction((tx) =>{
      tx.executeSql(
        "SELECT * FROM majors",
        [],
        (tx,results) =>{
          console.log(results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            console.log(temp);
          setMajor(temp);
          console.log("success");
        }
      )
    }))
  }, []);
  let listViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  let listItemView = (item) => {
    return (
      <View key={item.major_name} style={{padding: 20}}>
        <Text>{item.major_name}</Text>
      </View>
    );
  };

  return (
    <>
    <Header title="Contact"/>
        <View style={{flex: 1}}>
        <Text>Hello Woelds</Text> 
        {/* <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        /> */}
        </View>
    </>
  );
}

export default Contact