import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ArticleCardProps {
  title: string;
  image: string;
  author: string;
  time: string;
  readTime: string;
  likes: number;
  comments: number;
  handlePress: () => void;
  isBookmarked: boolean; // Add this line
  toggleBookmark: () => void; // Add this line
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  image,
  author,
  time,
  readTime,
  likes,
  comments,
  handlePress,
  isBookmarked, // Destructure isBookmarked
  toggleBookmark // Destructure toggleBookmarked
}) => {
    const router = useRouter();


  return (
    <View className="bg-white shadow-xl rounded-lg mb-5">
      {/* Image */}
      <Image source={{ uri: image }} className="w-full h-40 rounded-t-lg" />
      
      {/* Article Info */}
      <View className="p-4">
        <Pressable onPress={handlePress}>
            <Text className="text-lg font-bold mb-2">{title}</Text>
        </Pressable>
        <Text className="text-gray-500 mb-4">{author} | {readTime}</Text>
      </View>

      {/* Bottom Icons */}
      <View className="flex-row justify-between items-center px-4 pb-4">
        <View className="flex-row items-center">
          <FontAwesome name="heart-o" size={20} color="black" />
          <Text className="ml-2">{likes}</Text>
        </View>

        <View className="flex-row items-center">
          <FontAwesome name="comment-o" size={20} color="black" />
          <Text className="ml-2">{comments}</Text>
        </View>

        {/* Bookmark Icon */}
        <Pressable onPress={toggleBookmark}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={20}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ArticleCard;
