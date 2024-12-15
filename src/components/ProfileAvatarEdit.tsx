import { useState } from 'react';
import { View, StyleSheet, ImageProps, Pressable } from 'react-native';

import PlusIcon from '@/icons/PlusIcon';
import CrossIcon from '@/icons/CrossIcon';

import WomanAvatar from '../../assets/woman-avatar.jpg';

import Avatar from './Avatar';

export default function ProfileAvatarEdit() {
    const [avatar, setAvatar] = useState<ImageProps['source'] | undefined>();

    return (
        <View style={styles.profilePictureContainer}>
            <Avatar size="big" image={avatar} />

            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && { opacity: 0.7 },
                ]}
                onPress={() =>
                    setAvatar((prevState) =>
                        prevState ? undefined : WomanAvatar,
                    )
                }
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
