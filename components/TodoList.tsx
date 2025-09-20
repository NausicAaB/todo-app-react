import { Todo } from "@/types/todo";
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";

type deleteProps = {
  onPressAction: (id: string) => void;
  todos: Todo[];
};

export default function TodoList({ todos, onPressAction }: deleteProps) {
  function handleDelete(id: string) {
    onPressAction(id);
  }

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Aucune tâche pour le moment</Text>
      <Text style={styles.emptySubtitle}>Ajoutez votre première tâche ci-dessus !</Text>
      <View style={styles.decorativeElements}>
        <Text style={styles.emoji}>🦋  🌟  🎀</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.todoList}
      data={todos}
      ListEmptyComponent={EmptyState}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.todoItem}>
          <View style={styles.todo}>
            <Text style={styles.todoText}>Topic: {item.topic}</Text>
            <Text style={styles.todoText}>Due date: {item.dueDate}</Text>
            <Text style={styles.todoText}>Category: {item.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <AntDesign name="delete" size={20} color="white" />
            </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  todoList: {
    marginTop: 10,
  },
  todo:{
    flexDirection: "column",
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: "#666",
  },

  deleteButton: {
    backgroundColor: "#ab63db",
    padding: 10,
    borderRadius: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e58fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  decorativeElements: {
    flexDirection: 'row',
    gap: 20,
  },
  emoji: {
    fontSize: 24,
    opacity: 0.6,
  },
});
