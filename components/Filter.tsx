import { Todo } from "@/types/todo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import "react-native-get-random-values";

type filterProps = {
  sortKey: keyof Todo;
  sortOrder: "asc" | "desc";
  onChange: (key: keyof Todo, order: "asc" | "desc") => void;
  label: string;
};

export default function Filter({ sortKey, sortOrder, onChange, label }: filterProps) {
  return (
    <TouchableOpacity style={styles.button}
      onPress={() => onChange(sortKey, sortOrder === "asc" ? "desc" : "asc")}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: '#cda5d9',
        borderRadius: 8,
        borderWidth: 1,
        minWidth: 125,
        alignItems: 'center',
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 6,
      },
      text: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
      },
});
