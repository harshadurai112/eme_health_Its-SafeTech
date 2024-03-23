
import { Pressable, StyleSheet, Text, View } from 'react-native';

const SmallBluBtn = ({content}) =>{
  return (
    <View style={styles.container}>
      <View>
          
            <View style={styles.btn}>
              <Text style={{color:'white',fontSize:19, fontWeight: '700'}}>{content}</Text>
            </View>
          
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  btn:{
    backgroundColor:'#407CE2',
    borderColor:"#407CE2",
    borderWidth:1,
    width:100,
    height:60,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  }
});

export default SmallBluBtn;