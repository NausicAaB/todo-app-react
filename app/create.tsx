import { useAuth } from "@/hook/useAuth";
import { User } from "@/types/User";
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

export default function Index() {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const user: User = {
      id: undefined,
      firstName: firstName,
      lastName: lastName,
    };

    const result = await signup(user, email, password);
    if (!result.success) {
      Alert.alert("Erreur", result.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text> Signup </Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        onChangeText={setFirstName}
        value={firstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setLastName}
        value={lastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />

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
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
});
