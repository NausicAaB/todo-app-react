import { Todo } from "@/types/todo";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Index() {

  const [newTopic, setNewTopic] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function saveTodo() {
    if(newTopic === '' || newDueDate === '') {
      console.log("Topic or Due date is empty");
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      topic: newTopic,
      dueDate: newDueDate
    };
    setTodos([...todos, newTodo]);
    setNewTopic('');
    setNewDueDate('');
  }

  function removeTodo(id: string) {
    todos.splice(todos.findIndex((todo) => todo.id === id), 1);
    setTodos([...todos]);
  }

  return (
  <View>
    <TextInput
      placeholder="todo topic"
      onChangeText={setNewTopic}
      value={newTopic}
    />
    <TextInput
      placeholder="due date"
      onChangeText={setNewDueDate}
      value={newDueDate}
    />
    <Button onPressIn={() => saveTodo()}>
      Save Todo
    </Button>

    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.topic}</Text>
          <Text>{item.dueDate}</Text>
          <Button onPressIn={() => removeTodo(item.id)}>
            Remove
          </Button>
        </View>
      )}
    />
  </View>
  );
}
