import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";

export default function Index() {

    const handleCreate = () => {
        router.replace('/create');
      };

  return (
    <View style={styles.container}>
     <Text> Signin </Text>
     <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> Login </Text>
     </TouchableOpacity>

     <Text> No account ? </Text>
     <TouchableOpacity style={styles.button} onPress={()=>handleCreate()}>
        <Text style={styles.buttonText}> Create </Text>
     </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    backgroundColor: "#ab63db",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
