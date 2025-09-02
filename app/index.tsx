import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { CategoryFilter, Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import RNPickerSelect from "react-native-picker-select";
import Filter from "../components/Filter";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortKey, setSortKey] = useState<keyof Todo>("topic");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Tous');
  const [sortTodos, setSortTodos] = useState<Todo[]>([]);

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

  useEffect(()=>{
    const filter = todos.filter(todo => categoryFilter === "Tous" || todo.category === categoryFilter);

        const sorted = [...filter].sort((a, b) => {
          const aValue = a[sortKey];
          const bValue = b[sortKey];
          
          if (typeof aValue === "string" && typeof bValue === "string") {
            return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
          
          if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      
        setSortTodos(sorted); 
      }, [todos, categoryFilter, sortKey, sortOrder]);


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
      <RNPickerSelect
          onValueChange={(value) => {
            setCategoryFilter(value)
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
});
