import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import ArticleCard from "@/components/ArticleCard"; // Assuming the ArticleCard is in the components folder
import { FontAwesome } from "@expo/vector-icons";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]); // Track bookmarked articles
  const router = useRouter();

  const articles = [
    {
      id: 1,
      title:
        "Post-Recovery Assistance: The Key to Effective Healing and Long-Term Health",
      image:
        "https://post.healthline.com/wp-content/uploads/2020/11/woman-using-foam-roller-1296x728-header.jpg", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
      content: `Post-recovery assistance plays a critical role in ensuring long-term healing and preventing setbacks after an injury or surgery. While the initial recovery phase is crucial, post-recovery is where the body and mind truly rebuild strength, mobility, and well-being. This phase includes rehabilitation, physical therapy, mental health support, and lifestyle adjustments, all designed to restore an individual’s overall health. Without proper post-recovery assistance, there’s a higher risk of re-injury or relapse, as weakened muscles and poor mobility can lead to further complications. A structured, gradual approach to resuming daily activities ensures that patients regain strength safely.

One of the primary benefits of post-recovery assistance is improving strength and mobility. After periods of inactivity, muscles, and joints often become stiff or weak. Physical therapy provides targeted exercises that gradually build muscle strength, improve joint flexibility, and restore endurance. This ensures that patients regain full functionality and can return to their usual activities with confidence. Moreover, post-recovery assistance helps to address mental health challenges, such as anxiety, frustration, or depression, which can arise from the limitations imposed by an injury or illness. Emotional support and counseling are essential components of a comprehensive recovery plan.

Post-recovery assistance is also an opportunity to establish long-term healthy habits. Patients who have experienced injury often become more aware of their bodies and the need for sustained health and wellness. Through this process, they can implement new lifestyle habits, such as regular exercise, balanced nutrition, and better stress management techniques. By focusing on holistic recovery, post-recovery assistance ensures patients not only heal but also thrive. With ongoing monitoring and personalized care, post-recovery assistance provides patients with the best chance to maintain their health and avoid future complications.`,
    },
    {
      id:2,
      title:
        "Understanding Neck Pain: Causes, Treatments, and Prevention Strategies",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6UQBiOQFLuPLBJTgLwrp1K_wh235bvWYakA&s", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
      content: `Neck pain is a common ailment that affects people of all ages and backgrounds. It can stem from various factors, including poor posture, muscle strain, injuries, and underlying medical conditions. Understanding the causes and treatment options for neck pain is crucial for finding relief and preventing its recurrence.

One of the most prevalent causes of neck pain is poor posture, especially with the increasing use of smartphones and computers. Prolonged periods spent looking down at screens can lead to muscle strain and tension, resulting in discomfort and pain. Additionally, sleeping in an awkward position or using an unsupportive pillow can contribute to neck stiffness and soreness.

Injuries, such as whiplash from car accidents or sports-related injuries, can also lead to significant neck pain. Whiplash occurs when the head is suddenly jerked forward and then backward, straining the muscles and ligaments in the neck. This type of injury may require medical intervention, including physical therapy and pain management strategies.

Treatment options for neck pain vary based on the underlying cause and severity of symptoms. For mild cases, rest, ice, and over-the-counter pain relievers may be sufficient. Physical therapy is often recommended to improve strength, flexibility, and posture. In some instances, a healthcare professional may suggest injections or other advanced treatments for more chronic conditions.

Preventing neck pain involves making ergonomic adjustments to daily habits. Maintaining proper posture while sitting, using a supportive chair, and taking regular breaks from screen time can significantly reduce strain on the neck. Additionally, incorporating stretching and strengthening exercises into your routine can enhance neck stability and flexibility, reducing the risk of future pain.

In conclusion, neck pain is a multifaceted issue that can significantly impact one’s quality of life. By understanding its causes, exploring treatment options, and adopting preventative measures, individuals can effectively manage neck pain and improve their overall well-being. If neck pain persists or worsens, consulting a healthcare professional is essential to rule out any serious underlying conditions and to develop an appropriate treatment plan.`,
    },
    {
      id:3,
      title: "The Rise of Telehealth: Transforming Healthcare Delivery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvI9B2fJ9zy3Y-dCetOyfQjaCpoyNLg-5dXg&s", // Replace with your image URL
      author: "By Lucy Hiddleston",
      time: "12 hours ago",
      readTime: "4min read",
      likes: 28,
      comments: 72,
      content: `The advent of technology has revolutionized many aspects of our lives, and healthcare is no exception. Telehealth, or the use of digital communication tools to provide care and consultation, has gained significant traction, especially in recent years. This innovative approach has transformed how patients access medical services, providing convenience and accessibility while improving overall health outcomes.

One of the primary benefits of telehealth is the increased accessibility it offers to patients. Individuals living in remote areas or those with mobility challenges can now receive medical consultations without the need to travel long distances. This has been particularly beneficial during the COVID-19 pandemic, where social distancing measures made in-person visits challenging. Telehealth allows patients to connect with healthcare providers from the comfort of their homes, ensuring they receive timely care.

Telehealth also enhances the efficiency of healthcare delivery. Virtual consultations can reduce waiting times for appointments, allowing providers to see more patients throughout the day. Additionally, telehealth platforms often integrate with electronic health records, streamlining the documentation process and improving communication between healthcare providers. This efficiency can lead to faster diagnosis and treatment plans, ultimately benefiting patients.

Furthermore, telehealth facilitates a more patient-centered approach to healthcare. Patients can choose their preferred mode of communication, whether through video calls, phone consultations, or messaging. This flexibility empowers individuals to take charge of their health and fosters a more collaborative relationship between patients and providers. Additionally, telehealth can support follow-up appointments and chronic disease management, helping patients stay engaged in their care.

Despite its numerous advantages, telehealth also faces challenges. Issues such as technology access, internet connectivity, and concerns about the quality of care can hinder its effectiveness. However, ongoing advancements in technology and increased awareness of telehealth can help mitigate these challenges, ensuring that it becomes an integral part of the healthcare landscape.

In conclusion, telehealth is transforming the way healthcare is delivered, making it more accessible, efficient, and patient-centered. As technology continues to evolve, telehealth will likely play an increasingly vital role in the future of medicine, helping to bridge the gap between patients and providers. Embracing this change can lead to better health outcomes and a more sustainable healthcare system for all.`,
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
        image: article.image,
        author: article.author,
        time: article.time,
        readTime: article.readTime,
        content: article.content,
      },
    });
  };

  // Function to toggle bookmark
  const toggleBookmark = (articleId) => {
    if (bookmarkedArticles.some((article) => article.id === articleId)) {
      // Remove bookmark if it already exists
      setBookmarkedArticles((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    } else {
      // Add to bookmarks if not already there
      const article = articles.find((art) => art.id === articleId);
      setBookmarkedArticles((prev) => [...prev, article]);
    }
  };

  const handleBookmarkPagePress = () => {
    // Navigate to the bookmarks page
    router.push({
      pathname: "/(tabs)/article/bookmark",
      params: { bookmarks: JSON.stringify(bookmarkedArticles) },
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4">
        <Text className="text-2xl font-bold">Articles</Text>
        <Pressable onPress={handleBookmarkPagePress}>
          <FontAwesome name="bookmark-o" size={24} color="black" />
        </Pressable>
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
            isBookmarked={bookmarkedArticles.some((a) => a.id === article.id)} // Check if article is bookmarked
            handlePress={() => handlePress(article)}
            toggleBookmark={() => toggleBookmark(article.id)} // Pass toggleBookmark to the card
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
