import PostsIcon from '@/icons/PostsIcon';
import UserIcon from '@/icons/UserIcon';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { globalColorVariables } from '@/styles/variables';
import TabBar from '@/components/TabBar';
import LogoutIcon from '@/icons/LogoutIcon';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
    const { logout } = useAuth();

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
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
                }}
            />
            <Tabs.Screen
                name="create-post"
                options={{
                    title: 'Створити публікацію',
                    tabBarIcon: () => (
                        <View style={styles.addButton}>
                            <Ionicons
                                size={24}
                                name="add"
                                color={globalColorVariables.white}
                            />
                        </View>
                    ),
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
