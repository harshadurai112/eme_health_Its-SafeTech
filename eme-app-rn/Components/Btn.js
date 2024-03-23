
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Btn = ({content}) =>{
  return (
    <View style={styles.container}>
      <View>
          
            <View style={styles.btn}>
              <Text style={{color:'#407CE2',fontSize:19, fontWeight: '700'}}>{content}</Text>
            </View>
          
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  btn:{
    backgroundColor:'white',
    borderColor:"#407CE2",
    borderWidth:1,
    width:350,
    height:60,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  }
});

export default Btn;