import Filter from "@/components/Filter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/hook/useAuth";
import { useTodos } from "@/hook/useTodos";
import { CategoryFilter, Todo } from "@/types/todo";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import RNPickerSelect from "react-native-picker-select";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortKey, setSortKey] = useState<keyof Todo>("topic");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Tous");
  const [sortTodos, setSortTodos] = useState<Todo[]>([]);
  const { signout, user } = useAuth();
  const {add, remove} = useTodos();

  const categoriesFilters: CategoryFilter[] = [
    "Tous",
    "Travail",
    "Cegep",
    "Perso",
  ];
  const dropdownCategoriesFiltersData = categoriesFilters.map(
    (categoryFilter) => ({
      label: categoryFilter,
      value: categoryFilter,
    })
  );

  useEffect(() => {
    if (!user?.id) { 
      setTodos([]);
      return;
    }
  
    const q = query(collection(db, "todos"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));
      setTodos(todosData);
    });
  
    return () => unsubscribe();
  }, [user?.id]);
  

  useEffect(() => {
    const filter = todos.filter(
      (todo) => categoryFilter === "Tous" || todo.category === categoryFilter
    );

    const sorted = [...filter].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortTodos(sorted);
  }, [todos, categoryFilter, sortKey, sortOrder]);

  function saveTodo(newTodo: Todo) {
    add(newTodo);
  }

  function removeTodo(id: string) {
    //const newTodos = todos.filter((todo) => todo.id !== id);
    remove(id);
  }

  function handleSortChange(newSortKey: keyof Todo, newOrder: "asc" | "desc") {
    setSortKey(newSortKey);
    setSortOrder(newOrder);
  }

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={() => signout()}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>

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
      <RNPickerSelect
        onValueChange={(value) => {
          setCategoryFilter(value);
        }}
        items={dropdownCategoriesFiltersData}
        useNativeAndroidPickerStyle={true}
      />
      <TodoList todos={sortTodos} onPressAction={removeTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
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
