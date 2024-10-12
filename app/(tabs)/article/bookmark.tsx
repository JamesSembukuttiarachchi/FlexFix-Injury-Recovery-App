import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { useRouter, useLocalSearchParams } from "expo-router"; // use this hook to get route params
import { FontAwesome } from "@expo/vector-icons";

const BookmarksPage = () => {
  const { bookmarks } = useLocalSearchParams(); // useLocalSearchParams gives you the query params
  const bookmarkedArticles = bookmarks ? JSON.parse(bookmarks as string) : []; // Parse bookmarks
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handlePress = (article: any) => {
    // Navigate to recovery plan detail page and pass the plan details
    router.push({
      pathname: "/article/articleDetails",
      params: {
        title: article.title,
        image: article.image,
        author: article.author,
        time: article.time,
        readTime: article.readTime,
        content: article.content,
      },
    });
  };

  // Filter recovery plans based on the search query
  const filteredPlans = bookmarkedArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4">
        <Text className="text-2xl font-bold">Bookmark Articles</Text>

        <FontAwesome name="bookmark" size={24} color="black" />
      </View>

      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2 shadow-lg mb-6 mx-3"
        placeholder="Search Articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
            isBookmarked={false}
            toggleBookmark={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BookmarksPage;
