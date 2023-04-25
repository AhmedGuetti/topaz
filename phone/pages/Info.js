import { Text, View } from 'react-native';
import Header from '../componenet/Header'
function Info() {
  return (
    <>
    <Header title="Info"/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Info!</Text>
      </View>
    </>
  )
}

export default Info;