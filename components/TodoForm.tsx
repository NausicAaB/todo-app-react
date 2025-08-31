import { Todo } from "@/types/todo";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type submitProps = {
  onPressAction: (newTodo: Todo) => void;
};

export default function TodoForm({ onPressAction }: submitProps) {
  const [newTopic, setNewTopic] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  function handleSubmit() {
    if (newTopic === "" || newDueDate === "") {
      console.log("Topic or Due date is empty");
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      topic: newTopic,
      dueDate: newDueDate,
    };

    onPressAction(newTodo);
    setNewTopic("");
    setNewDueDate("");
  }

  function handleDateChange(event: any, selectedDate?: Date) {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      let fDate =
        selectedDate.getDate() +
        "/" +
        (selectedDate.getMonth() + 1) +
        "/" +
        selectedDate.getFullYear();
      setNewDueDate(fDate);
    }
  }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Todo topic"
        onChangeText={setNewTopic}
        value={newTopic}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Due date"
          value={newDueDate}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={handleDateChange} />
      )}
      <TouchableOpacity onPressIn={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Save Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,

    marginTop: 10,
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
