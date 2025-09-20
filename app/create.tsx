import { useAuth } from "@/hook/useAuth";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";

export default function Index() {
  const { signup } = useAuth();

  function getRandomIntInclusive(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
  }

  async function handleRegister() {
    const result = await signup("test" + getRandomIntInclusive(1,200000) + "@test.com", "password123");
    if (!result.success) {
      Alert.alert("Erreur", result.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text> Signup </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
        <Text style={styles.buttonText}> Register </Text>
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
