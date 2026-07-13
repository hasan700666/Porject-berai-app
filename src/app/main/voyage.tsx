import { Chango_400Regular } from "@expo-google-fonts/chango";
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    useFonts
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { ArrowBigDown, ArrowBigUp, MapPin, MessageSquareText } from 'lucide-react-native';
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

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

    // Local state for list of posts
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "1",
            userName: "Bety Miller",
            userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            timestamp: "2 minutes ago",
            postImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
            caption: "Those who don't believe in magic will never find it. ✨",
            voteCount: 1420,
            location: "Phi Phi, Thailand"
        },
        {
            id: "2",
            userName: "Marcus Aurelius",
            userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            timestamp: "1 hour ago",
            postImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
            caption: "Lost in the streets of Kyoto, finding peace in every corner. 🇯🇵",
            voteCount: 856,
            location: "Kyoto, Japan"
        },
        {
            id: "3",
            userName: "Sophia Chen",
            userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
            timestamp: "3 hours ago",
            postImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
            caption: "A morning hike above the clouds. Nothing beats this view. 🏔️",
            voteCount: 2341,
            location: "Fitz Roy, Argentina"
        },
        {
            id: "4",
            userName: "David K.",
            userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
            timestamp: "5 hours ago",
            postImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
            caption: "Golden hour in the desert. Endless dunes and perfect quiet. 🏜️",
            voteCount: 612,
            location: "Sahara, Morocco"
        },
        {
            id: "5",
            userName: "Emma Watson",
            userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            timestamp: "1 day ago",
            postImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80",
            caption: "Exploring the hidden canals of Venice. Feels like a dreamscape. 🛶",
            voteCount: 3105,
            location: "Venice, Italy"
        }
    ]);

    // Local state for user votes on each post
    const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#46BCEE" />
            </View>
        );
    }

    const handleUpvote = (postId: string) => {
        setUserVotes(prevUserVotes => {
            const currentVote = prevUserVotes[postId] || null;
            let voteDiff = 0;
            let newVote: 'up' | 'down' | null = null;

            if (currentVote === 'up') {
                voteDiff = -1;
                newVote = null;
            } else {
                voteDiff = currentVote === 'down' ? 2 : 1;
                newVote = 'up';
            }

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, voteCount: post.voteCount + voteDiff }
                        : post
                )
            );

            return { ...prevUserVotes, [postId]: newVote };
        });
    };

    const handleDownvote = (postId: string) => {
        setUserVotes(prevUserVotes => {
            const currentVote = prevUserVotes[postId] || null;
            let voteDiff = 0;
            let newVote: 'up' | 'down' | null = null;

            if (currentVote === 'down') {
                voteDiff = 1;
                newVote = null;
            } else {
                voteDiff = currentVote === 'up' ? -2 : -1;
                newVote = 'down';
            }

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, voteCount: post.voteCount + voteDiff }
                        : post
                )
            );

            return { ...prevUserVotes, [postId]: newVote };
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ headerShown: false }} />

            {posts.map((post) => {
                const userVote = userVotes[post.id] || null;
                return (
                    <View key={post.id} style={styles.cardContainer}>
                        {/* User Info Header */}
                        <View style={styles.userHeader}>
                            <View style={styles.userProfile}>
                                {/* Avatar */}
                                <Image
                                    source={{ uri: post.userAvatar }}
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
                                source={{ uri: post.postImage }}
                                style={styles.postImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Post Caption */}
                        <View style={styles.captionContainer}>
                            <Text style={styles.captionText}>
                                {post.caption}
                            </Text>
                        </View>

                        {/* Footer Status with Buttons */}
                        <View style={styles.footerRow}>
                            {/* Interactions (Upvote, Downvote, Comment) */}
                            <View style={styles.actionsRight}>
                                {/* Upvote */}
                                <Pressable onPress={() => handleUpvote(post.id)} style={styles.actionButton}>
                                    <ArrowBigUp
                                        size={22}
                                        color={userVote === 'up' ? '#46BCEE' : '#64748B'}
                                        fill={userVote === 'up' ? '#46BCEE' : 'transparent'}
                                    />
                                </Pressable>

                                <Text style={[styles.voteText, userVote === 'up' && styles.activeUpvoteText]}>
                                    {post.voteCount}
                                </Text>

                                {/* Downvote */}
                                <Pressable onPress={() => handleDownvote(post.id)} style={styles.actionButton}>
                                    <ArrowBigDown
                                        size={22}
                                        color={userVote === 'down' ? '#EF4444' : '#64748B'}
                                        fill={userVote === 'down' ? '#EF4444' : 'transparent'}
                                    />
                                </Pressable>

                                {/* Comment */}
                                <Pressable onPress={() => alert(`Comment pressed for post ${post.id}`)} style={styles.actionButton}>
                                    <MessageSquareText size={20} color="#64748B" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
});
