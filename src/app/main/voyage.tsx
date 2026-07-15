import { Chango_400Regular } from "@expo-google-fonts/chango";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import {
  ArrowBigDown,
  ArrowBigUp,
  MapPin,
  MessageSquareText,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  postImage: string;
  caption: string;
  voteCount: number;
  location: string;
}

export default function VoyageScreen() {
  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Chango_400Regular,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Local state for user votes on each post
  const [userVotes, setUserVotes] = useState<
    Record<string, "up" | "down" | null>
  >({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("post")
          .select(
            "id, user_name, user_img, post_img, post_description, post_location, post_upvote, post_time",
          )
          .order("id", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error.message);
          return;
        }

        const mappedPosts: Post[] = (data ?? []).map((item: any) => ({
          id: item.id?.toString() ?? "",
          userName: item.user_name || "Traveler Explorer",
          userAvatar: item.user_img || "",
          timestamp: item.post_time || "Just now",
          postImage: item.post_img || "",
          caption: item.post_description || "No caption yet",
          voteCount: Number(item.post_upvote ?? 0),
          location: item.post_location || "Unknown location",
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (!fontsLoaded || postsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#46BCEE" />
      </View>
    );
  }

  const handleUpvote = (postId: string) => {
    setUserVotes((prevUserVotes) => {
      const currentVote = prevUserVotes[postId] || null;
      let voteDiff = 0;
      let newVote: "up" | "down" | null = null;

      if (currentVote === "up") {
        voteDiff = -1;
        newVote = null;
      } else {
        voteDiff = currentVote === "down" ? 2 : 1;
        newVote = "up";
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, voteCount: post.voteCount + voteDiff }
            : post,
        ),
      );

      return { ...prevUserVotes, [postId]: newVote };
    });
  };

  const handleDownvote = (postId: string) => {
    setUserVotes((prevUserVotes) => {
      const currentVote = prevUserVotes[postId] || null;
      let voteDiff = 0;
      let newVote: "up" | "down" | null = null;

      if (currentVote === "down") {
        voteDiff = 1;
        newVote = null;
      } else {
        voteDiff = currentVote === "up" ? -2 : -1;
        newVote = "down";
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, voteCount: post.voteCount + voteDiff }
            : post,
        ),
      );

      return { ...prevUserVotes, [postId]: newVote };
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>VOYAGE</Text>
      </View>

      {posts.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No voyages yet. Publish one to fill the feed.
          </Text>
        </View>
      ) : (
        posts.map((post) => {
          const userVote = userVotes[post.id] || null;
          return (
            <View key={post.id} style={styles.cardContainer}>
              {/* User Info Header */}
              <View style={styles.userHeader}>
                <View style={styles.userProfile}>
                  {/* Avatar */}
                  <Image
                    source={{
                      uri:
                        post.userAvatar ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                    }}
                    style={styles.avatar}
                  />
                  <View style={styles.userMeta}>
                    <Text style={styles.profileName}>{post.userName}</Text>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>
                </View>
                {/* Location (on the right) */}
                {post.location && (
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#000000" />
                    <Text style={styles.locationText}>{post.location}</Text>
                  </View>
                )}
              </View>

              {/* Featured Travel Post Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      post.postImage ||
                      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
                  }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              </View>

              {/* Post Caption */}
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>{post.caption}</Text>
              </View>

              {/* Footer Status with Buttons */}
              <View style={styles.footerRow}>
                {/* Interactions (Upvote, Downvote, Comment) */}
                <View style={styles.actionsRight}>
                  {/* Upvote */}
                  <Pressable
                    onPress={() => handleUpvote(post.id)}
                    style={styles.actionButton}
                  >
                    <ArrowBigUp
                      size={22}
                      color={userVote === "up" ? "#46BCEE" : "#64748B"}
                      fill={userVote === "up" ? "#46BCEE" : "transparent"}
                    />
                  </Pressable>

                  <Text
                    style={[
                      styles.voteText,
                      userVote === "up" && styles.activeUpvoteText,
                    ]}
                  >
                    {post.voteCount}
                  </Text>

                  {/* Downvote */}
                  <Pressable
                    onPress={() => handleDownvote(post.id)}
                    style={styles.actionButton}
                  >
                    <ArrowBigDown
                      size={22}
                      color={userVote === "down" ? "#EF4444" : "#64748B"}
                      fill={userVote === "down" ? "#EF4444" : "transparent"}
                    />
                  </Pressable>

                  {/* Comment */}
                  <Pressable
                    onPress={() => alert(`Comment pressed for post ${post.id}`)}
                    style={styles.actionButton}
                  >
                    <MessageSquareText size={20} color="#64748B" />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontFamily: "Chango_400Regular",
    fontSize: 22,
    color: "#0F172A",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 16,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  userMeta: {
    marginLeft: 12,
  },
  profileName: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#0F172A",
  },
  timestamp: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  imageContainer: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  captionContainer: {
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  captionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  footerRow: {
    display: "flex",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  voteText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#64748B",
  },
  activeUpvoteText: {
    color: "#46BCEE",
  },
  actionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
  },
  repliesText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#64748B",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  locationText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  emptyStateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 16,
  },
  emptyStateText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
