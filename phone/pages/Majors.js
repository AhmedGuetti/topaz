import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../componenet/Header'
import topaz from '../api/topaz';
import { List } from 'react-native-paper'


function Major({navigation}) {
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
      <List.Item key={key}
              title={item.major_name}
              value={item.major_id}
              style={{padding: 10}}
              onPress={()=>{
                navigation.navigate('Note', {major_name: item.major_name,major_id:item.major_id})
              }}
              left={() => <List.Icon color="#000" icon="bookshelf" />}
      />

      );
return (

  <SafeAreaView>
    <Header title="Major"/>
      <ScrollView style={styles.scrollView}>
        <View style={{flex: 1}}> 
        <List.Section>
            {listMajor}
            <List.Item 
              title=""
              style={{padding: 50}}
            />
            <List.Item 
              title=""
              style={{padding: 50}}
            />
            <List.Item 
              title=""
              style={{padding: 50}}
            />
            <List.Item 
              title=""
              style={{padding: 50}}
            />
            <List.Item 
              title=""
              style={{padding: 50}}
            />
            <List.Item 
              title=""
              style={{padding: 50}}
            />
        </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>

)
}
const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
});
export default Major;