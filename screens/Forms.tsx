import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updatePost } from "../services/axios";

export default function Forms() {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = () => {
    updatePost(post.id, { title, body }).then(() => {
      navigation.navigate("Home", {
  params: {
    updatedPost: { ...post, title, body },
  },
});
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        multiline
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        style={styles.input}
        multiline
      />
      <Button title="UPDATE POST" onPress={handleUpdate} />
      <View style={{ marginTop: 10 }}>
        <Button title="GO BACK" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});
