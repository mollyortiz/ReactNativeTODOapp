import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  Button,
  View,
} from "react-native";
import { CheckBox } from "@rneui/themed";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      description: "Go grocery shopping for the week",
      completed: false,
    },
    { id: "2", description: "Walk the dog", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), description: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={item.completed ? styles.completedTask : styles.taskText}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="New task"
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 25 },
  taskContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  taskText: { fontSize: 18 },
  completedTask: {
    fontSize: 18,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  inputContainer: { flexDirection: "row", padding: 10 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10, fontSize: 18 },
});
