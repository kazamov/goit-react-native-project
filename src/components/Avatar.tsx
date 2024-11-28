import { View, StyleSheet, Image, ImageProps } from 'react-native';

import { globalColorVariables } from '@/styles/variables';

interface AvatarProps {
    image?: ImageProps['source'];
    size: 'big' | 'normal';
}

export default function Avatar({ image, size }: AvatarProps) {
    const localSize = size ?? 'normal';
    return (
        <View style={[styles.avatar, localSize === 'big' && styles.big]}>
            {image ? (
                <Image
                    source={image}
                    style={[styles.avatar, localSize === 'big' && styles.big]}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: globalColorVariables.gray1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    big: {
        width: 120,
        height: 120,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});