import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { getUsers } from "../services/axios";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    getUsers().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const updated = (route.params as { updatedPost: any })?.updatedPost;
      if (updated) {
        setPosts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        // Reset param agar tidak update terus
        navigation.setParams(undefined);
      }
    }, [route])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      {posts.map((post) => (
        <Pressable
          key={post.id}
          style={styles.card}
          onPress={() => navigation.navigate("Forms", { post })}
        >
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text>{post.body}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
});
