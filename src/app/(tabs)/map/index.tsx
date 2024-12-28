import { usePosts } from '@/hooks/usePosts';
import ArrowLeft from '@/icons/ArrowLeft';
import { Post } from '@/models/post';
import { globalColorVariables } from '@/styles/variables';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import MapView, { MAP_TYPES, Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
    const { postId } = useLocalSearchParams();
    const { posts } = usePosts();

    const post = useMemo(
        () => posts?.find((post) => post.id === postId) as Post,
        [postId, posts],
    );
    const { location } = post;

    const [coordinates, setCoordinates] = useState<Region>({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <View style={styles.screen}>
            <Stack.Screen
                options={{
                    title: 'Мапа',
                    headerShown: true,
                    headerLeft: () => {
                        return (
                            <Pressable onPress={() => router.back()}>
                                <ArrowLeft />
                            </Pressable>
                        );
                    },
                    headerTitleAlign: 'center',
                }}
            />
            <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                <MapView
                    style={styles.mapStyle}
                    region={coordinates}
                    mapType={MAP_TYPES.STANDARD}
                    minZoomLevel={15}
                    onRegionChangeComplete={(region) => {
                        setCoordinates((prevRegion) => ({
                            ...prevRegion,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.latitudeDelta,
                        }));
                    }}
                >
                    <Marker
                        title={post.place}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        description={post.title}
                    />
                </MapView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        paddingBlockStart: 32,
        backgroundColor: globalColorVariables.white,
    },
    mapStyle: {
        flex: 1,
    },
});
