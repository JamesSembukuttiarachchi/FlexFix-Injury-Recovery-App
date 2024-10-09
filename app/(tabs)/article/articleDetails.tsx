import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ArticleDetail = () => {
  const { title, image, author, time, readTime, content } = useLocalSearchParams();
  const articleTitle = Array.isArray(title) ? title[0] : title;
  const articleImage = Array.isArray(image) ? image[0] : image;
  const articleAuthor = Array.isArray(author) ? author[0] : author;
  const articleTime = Array.isArray(time) ? time[0] : time;
  const articleReadTime = Array.isArray(readTime) ? readTime[0] : readTime;
  const articleContent = Array.isArray(content) ? content[0] : content;

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Article Title */}
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-black">{articleTitle}</Text>
      </View>

      {/* Article Image */}
      <Image source={{ uri: articleImage }} className="w-full h-60" />

      {/* Article Content */}
      <View className="px-4 py-6">
        <Text className="text-base text-gray-700">{articleContent}</Text>
      </View>

      {/* Author and Read Time */}
      <View className="px-4 py-4">
        <Text className="text-gray-500">By {articleAuthor}</Text>
        <Text className="text-gray-500">{articleTime} | {articleReadTime}</Text>
      </View>
    </ScrollView>
  );
};

export default ArticleDetail;
