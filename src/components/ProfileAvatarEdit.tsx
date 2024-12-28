import { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import {
    ImagePickerAsset,
    launchImageLibraryAsync,
    useMediaLibraryPermissions,
} from 'expo-image-picker';

import PlusIcon from '@/icons/PlusIcon';
import CrossIcon from '@/icons/CrossIcon';

import Avatar from './Avatar';

const pickImage = async () => {
    const result = await launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        allowsMultipleSelection: false,
    });

    if (!result.canceled) {
        return result.assets[0];
    }

    return null;
};

export interface ProfileAvatarEditProps {
    avatar?: ImagePickerAsset;
    onAvatarChange?: (avatar: ImagePickerAsset | undefined) => void;
}

export default function ProfileAvatarEdit({
    avatar,
    onAvatarChange,
}: ProfileAvatarEditProps) {
    const [mediaLibraryPermission, requestMediaLibraryPermission] =
        useMediaLibraryPermissions();

    const pickAvatarImage = useCallback(async () => {
        let permissionGranted = mediaLibraryPermission?.granted ?? false;

        if (!permissionGranted) {
            permissionGranted = (await requestMediaLibraryPermission()).granted;
        }

        if (permissionGranted) {
            const asset = await pickImage();
            if (asset) {
                onAvatarChange?.(asset);
            }
        }
    }, [
        mediaLibraryPermission?.granted,
        onAvatarChange,
        requestMediaLibraryPermission,
    ]);

    const resetAvatar = useCallback(() => {
        onAvatarChange?.(undefined);
    }, [onAvatarChange]);

    return (
        <View style={styles.profilePictureContainer}>
            <Avatar size="big" image={avatar?.uri ?? null} />

            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && { opacity: 0.7 },
                ]}
                onPress={avatar ? resetAvatar : pickAvatarImage}
            >
                {avatar ? <CrossIcon /> : <PlusIcon />}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 14,
        right: 0,
        transform: [{ translateX: '50%' }],
    },
    profilePictureContainer: {
        position: 'relative',
    },
});
