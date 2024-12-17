import { router, Stack, useFocusEffect } from 'expo-router';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
    PermissionStatus,
    CameraView,
    useCameraPermissions,
    CameraCapturedPicture,
} from 'expo-camera';
import { usePermissions as useMediaLibraryPermissions } from 'expo-media-library';
import {
    useForegroundPermissions,
    getCurrentPositionAsync,
} from 'expo-location';

import Button from '@/components/ActionButton';
import ArrowLeft from '@/icons/ArrowLeft';
import { globalColorVariables } from '@/styles/variables';
import TrashIcon from '@/icons/TrashIcon';
import TextInput from '@/components/TextInput';
import MapPinIcon from '@/icons/MapPinIcon';
import CameraIcon from '@/icons/CameraIcon';
import FormField from '@/components/FormField';
import { usePosts } from '@/contexts/PostsContext';
import { Post } from '@/models/post';

interface CreatePostFormState {
    title: string;
    place: string;
}

export default function CreatePostScreen() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] =
        useMediaLibraryPermissions();
    const [locationPermission, requestLocationPermission] =
        useForegroundPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
    const { addPost } = usePosts();

    const { control, handleSubmit, formState, reset } =
        useForm<CreatePostFormState>({
            defaultValues: {
                title: '',
                place: '',
            },
            mode: 'onSubmit',
        });

    const onSubmit = useCallback(
        async (data: CreatePostFormState) => {
            const location = await getCurrentPositionAsync();

            const newPost: Post = {
                ...data,
                id: Date.now().toString(),
                location,
                photo: photo as CameraCapturedPicture,
                comments: [],
                likes: 0,
            };

            addPost(newPost);

            router.push('/posts');
        },
        [addPost, photo],
    );

    const takePhoto = useCallback(async () => {
        if (cameraRef.current) {
            const localPhoto = await cameraRef.current.takePictureAsync();
            localPhoto && setPhoto(localPhoto);
        }
    }, []);

    const clearPhoto = useCallback(async () => {
        setPhoto(null);
    }, []);

    useEffect(() => {
        requestMediaLibraryPermission();
        requestCameraPermission();
        requestLocationPermission();
    }, [
        requestCameraPermission,
        requestLocationPermission,
        requestMediaLibraryPermission,
    ]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                reset();
                clearPhoto();
            };
        }, [clearPhoto, reset]),
    );

    const pageContent = useMemo(() => {
        if (
            cameraPermission === null ||
            cameraPermission.status === PermissionStatus.UNDETERMINED ||
            mediaLibraryPermission === null ||
            mediaLibraryPermission.status === PermissionStatus.UNDETERMINED ||
            locationPermission === null ||
            locationPermission.status === PermissionStatus.UNDETERMINED
        ) {
            return null;
        }

        if (
            (!cameraPermission.granted &&
                !cameraPermission.canAskAgain &&
                cameraPermission.status === PermissionStatus.DENIED) ||
            (!mediaLibraryPermission.granted &&
                !mediaLibraryPermission.canAskAgain &&
                mediaLibraryPermission.status === PermissionStatus.DENIED) ||
            (!locationPermission.granted &&
                !locationPermission.canAskAgain &&
                locationPermission.status === PermissionStatus.DENIED)
        ) {
            return (
                <View>
                    <Text>
                        Нам потрібен дозвіл на користування камерою, медіа
                        бібліотекою та поточного місцеположення. Увімкніть
                        дозвіл в налаштуваннях вашого пристрою
                    </Text>
                </View>
            );
        }

        return (
            <>
                {photo ? (
                    <Pressable
                        onPress={clearPhoto}
                        style={styles.photoCardContainer}
                    >
                        <Image
                            source={{ uri: photo.uri }}
                            style={styles.photoCard}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={takePhoto}
                        style={styles.photoCardContainer}
                    >
                        <CameraView
                            ref={cameraRef}
                            style={styles.photoCard}
                            facing={'back'}
                        >
                            <View style={styles.photoCardIcon}>
                                <CameraIcon />
                            </View>
                        </CameraView>
                    </Pressable>
                )}
                <Text style={styles.photoCardLabel}>
                    {photo ? 'Редагувати фото' : 'Завантажте фото'}
                </Text>

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error, invalid },
                    }) => (
                        <FormField error={error}>
                            <TextInput
                                invalid={invalid}
                                placeholder="Назва"
                                keyboardType="default"
                                inputMode="text"
                                variant="secondary"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={{
                                    marginBlockEnd: 16,
                                }}
                            />
                        </FormField>
                    )}
                    name="title"
                    rules={{ required: "Це поле обов'язкове" }}
                />

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error, invalid },
                    }) => (
                        <FormField error={error}>
                            <TextInput
                                invalid={invalid}
                                placeholder="Місцевість"
                                keyboardType="default"
                                inputMode="text"
                                variant="secondary"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={{
                                    marginBlockEnd: 32,
                                }}
                                iconLeft={() => <MapPinIcon />}
                            />
                        </FormField>
                    )}
                    name="place"
                    rules={{ required: "Це поле обов'язкове" }}
                />
                <Button
                    disabled={
                        !formState.isValid || formState.isSubmitting || !photo
                    }
                    label="Опублікувати"
                    onPress={handleSubmit(onSubmit)}
                />
                <SafeAreaView edges={['bottom']} style={{ marginTop: 'auto' }}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <View style={styles.deleteButton}>
                            <TrashIcon />
                        </View>
                    </View>
                </SafeAreaView>
            </>
        );
    }, [
        cameraPermission,
        clearPhoto,
        control,
        formState.isSubmitting,
        formState.isValid,
        handleSubmit,
        locationPermission,
        mediaLibraryPermission,
        onSubmit,
        photo,
        takePhoto,
    ]);

    return (
        <SafeAreaProvider>
            <View style={styles.screen}>
                <Stack.Screen
                    options={{
                        title: 'Створити публікацію',
                        headerShown: true,
                        headerLeft: () => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        router.back();
                                    }}
                                >
                                    <ArrowLeft />
                                </Pressable>
                            );
                        },
                        headerTitleAlign: 'center',
                    }}
                />
                {pageContent}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: globalColorVariables.white,
        flex: 1,
        paddingInline: 16,
        paddingBlockStart: 32,
    },
    deleteButton: {
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalColorVariables.gray1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoCardContainer: {
        width: '100%',
        marginBlockEnd: 8,
    },
    photoCard: {
        width: '100%',
        height: 240,
        borderWidth: 1,
        borderColor: globalColorVariables.gray2,
        backgroundColor: globalColorVariables.gray1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    photoCardIcon: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: globalColorVariables.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoCardLabel: {
        color: globalColorVariables.gray3,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        letterSpacing: 0,
        marginBlockEnd: 32,
    },
});
