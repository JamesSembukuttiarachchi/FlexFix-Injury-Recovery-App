import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import ArticleCard from "@/components/ArticleCard"; // Assuming the ArticleCard is in the components folder
import { FontAwesome } from "@expo/vector-icons";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const articles = [
    {
      title:
        "20 Years Ago, Steve Jobs Built the 'Coolest Computer Ever.' It Bombed",
      image: "https://via.placeholder.com/60", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
    },
    {
      title:
        "20 Years Ago, Steve Jobs Built the 'Coolest Computer Ever.' It Bombed",
      image: "https://via.placeholder.com/60", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
    },
    {
      title:
        "20 Years Ago, Steve Jobs Built the 'Coolest Computer Ever.' It Bombed",
      image: "https://via.placeholder.com/60", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
    },
    // Repeat for other articles or dynamically load them
  ];

  // Filter recovery plans based on the search query
  const filteredPlans = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (article: any) => {
    // Navigate to recovery plan detail page and pass the plan details
    router.push({
      pathname: "/article/articleDetails",
      params: {
        title: article.title,
        image: article.imageUrl,
        author: article.author,
        time: article.time,
        readTime: article.readTime,
        content: `A sprained ankle occurs when the ligaments that support the joint are stretched or torn, often due to twisting or rolling the foot inward or outward. This injury commonly affects the lateral ligaments on the outside of the ankle. Symptoms include pain, swelling, bruising, and difficulty bearing weight. While most ankle sprains are mild and heal with self-care, more severe cases might require medical intervention.`,
      },
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4">
        <Text className="text-2xl font-bold">Articles</Text>
        <FontAwesome name="bookmark-o" size={24} color="black" />
      </View>

      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2 shadow-lg mb-6 mx-3"
        placeholder="Search Articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Articles List */}
      <ScrollView className="flex-1 px-4">
        {filteredPlans.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            image={article.image}
            author={article.author}
            time={article.time}
            readTime={article.readTime}
            likes={article.likes}
            comments={article.comments}
            handlePress={() => handlePress(article)}
          />
        ))}
      </ScrollView>

      {/* Pagination */}
      <View className="flex-row justify-center items-center py-4">
        <Pressable className="mx-2 p-2 bg-orange-300 rounded-full">
          <FontAwesome name="chevron-left" size={16} color="white" />
        </Pressable>
        <Text className="text-lg mx-4">1</Text>
        <Text className="text-lg mx-4">2</Text>
        <Text className="text-lg mx-4">3</Text>
        <Pressable className="mx-2 p-2 bg-orange-300 rounded-full">
          <FontAwesome name="chevron-right" size={16} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ArticlesPage;
