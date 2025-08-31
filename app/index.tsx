import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import Filter from "../components/Filter";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortKey, setSortKey] = useState<keyof Todo>("topic");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function saveTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function removeTodo(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  }

  function handleSortChange(newSortKey: keyof Todo, newOrder: "asc" | "desc") {
    setSortKey(newSortKey);
    setSortOrder(newOrder);
  }

  const sortedTodos = [...todos].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <View style={styles.container}>
      <TodoForm onPressAction={saveTodo} />
      <View style={styles.filter}>
      <Filter
        onChange={handleSortChange}
        sortKey="topic"
        sortOrder={sortKey === "topic" ? sortOrder : "asc"}
        label="Titre"
      />
      <Filter
        onChange={handleSortChange}
        sortKey="dueDate"
        sortOrder={sortKey === "dueDate" ? sortOrder : "asc"}
        label="Date"
      />
      </View>
      <TodoList todos={sortedTodos} onPressAction={removeTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  filter:{
    flexDirection: 'row',
    justifyContent: "space-around",
    marginVertical: 30
  }
});
