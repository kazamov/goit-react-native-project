import { useState } from 'react';
import { View, StyleSheet, ImageProps } from 'react-native';

import PlusIcon from '@/icons/PlusIcon';
import CrossIcon from '@/icons/CrossIcon';

import WomanAvatar from '../../assets/woman-avatar.jpg';

import Avatar from './Avatar';
import IconButton from './IconButton';

export default function ProfileAvatarEdit() {
    const [avatar, setAvatar] = useState<ImageProps['source'] | undefined>();

    return (
        <View style={styles.profilePictureContainer}>
            <Avatar size="big" image={avatar} />
            <IconButton
                style={styles.profileIconButton}
                onPress={() =>
                    setAvatar((prevState) =>
                        prevState ? undefined : WomanAvatar,
                    )
                }
            >
                {avatar ? <CrossIcon /> : <PlusIcon />}
            </IconButton>
        </View>
    );
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        position: 'relative',
    },
    profileIconButton: {
        position: 'absolute',
        bottom: 14,
        right: 0,
        transform: [{ translateX: '50%' }],
    },
});
