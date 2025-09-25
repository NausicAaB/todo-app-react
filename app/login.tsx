import { useAuth } from "@/hook/useAuth";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import "react-native-get-random-values";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(username: string, password: string) {
    const result = await login(username, password);
    if (!result.success) {
      Alert.alert("Erreur", result.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text> Login </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(username, password)}
      >
        <Text style={styles.buttonText}> Login </Text>
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
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
});
