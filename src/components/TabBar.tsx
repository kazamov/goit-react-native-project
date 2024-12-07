import { StyleSheet, View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalColorVariables } from '@/styles/variables';

export default function TabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{ backgroundColor: globalColorVariables.white }}
        >
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const tabBarIcon = options.tabBarIcon;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    return (
                        <PlatformPressable
                            pressOpacity={0.8}
                            key={index}
                            href={buildHref(route.name, route.params)}
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            onPress={onPress}
                        >
                            <View style={styles.tabBarIconWrapper}>
                                {tabBarIcon?.({
                                    focused: isFocused,
                                    color: '',
                                    size: 24,
                                })}
                            </View>
                        </PlatformPressable>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 58,
        borderBlockStartColor: globalColorVariables.splitLine,
        borderTopWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 31,
    },
    tabBarIconWrapper: {
        height: 40,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
