import PostsIcon from '@/icons/PostsIcon';
import UserIcon from '@/icons/UserIcon';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { globalColorVariables } from '@/styles/variables';
import LogoutIcon from '@/icons/LogoutIcon';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
    const { logout } = useAuth();

    return (
        <Tabs
            screenOptions={{
                animation: 'shift',
                sceneStyle: {
                    backgroundColor: globalColorVariables.white,
                },
                headerShadowVisible: false,
                headerStyle: {
                    borderBottomColor: globalColorVariables.splitLine,
                    borderBottomWidth: 0.5,
                },
                headerTitleAlign: 'center',
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 9,
                },
                tabBarItemStyle: { position: 'relative' },
            }}
        >
            <Tabs.Screen
                name="posts"
                options={{
                    title: 'Публікації',
                    tabBarIcon: ({ focused }) => (
                        <PostsIcon
                            color={
                                focused
                                    ? globalColorVariables.primary
                                    : undefined
                            }
                        />
                    ),
                    headerRightContainerStyle: {
                        paddingInlineEnd: 16,
                    },
                    headerRight: () => (
                        <Pressable onPress={logout}>
                            <LogoutIcon />
                        </Pressable>
                    ),
                    tabBarIconStyle: {
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: [{ translateY: '-50%' }],
                    },
                }}
            />
            <Tabs.Screen
                name="create-post"
                options={{
                    tabBarIcon: () => (
                        <View style={styles.addButton}>
                            <Ionicons
                                size={24}
                                name="add"
                                color={globalColorVariables.white}
                            />
                        </View>
                    ),
                    headerShown: false,
                    tabBarItemStyle: {
                        flex: 0,
                        width: 132,
                    },
                    tabBarStyle: {
                        display: 'none',
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профіль',
                    tabBarIcon: ({ focused }) => (
                        <UserIcon
                            color={
                                focused
                                    ? globalColorVariables.primary
                                    : undefined
                            }
                        />
                    ),
                    tabBarIconStyle: {
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: [{ translateY: '-50%' }],
                    },
                }}
            />
            <Tabs.Screen
                name="comments"
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        display: 'none',
                    },
                    tabBarStyle: {
                        display: 'none',
                    },
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        display: 'none',
                    },
                    tabBarStyle: {
                        display: 'none',
                    },
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    addButton: {
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalColorVariables.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
