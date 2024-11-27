import { View, Text, ImageBackground } from 'react-native';

import AuthBackgroundImg from '../../assets/auth-background.jpg';

export default function RegistrationScreen() {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={AuthBackgroundImg}
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: 500, color: '#fff' }}>
                    Registration Screen
                </Text>
            </ImageBackground>
        </View>
    );
}
