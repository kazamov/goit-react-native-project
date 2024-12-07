import { globalColorVariables } from '@/styles/variables';
import Svg, { SvgProps, Path } from 'react-native-svg';

const UserIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke={props.color ?? globalColorVariables.inputText}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        />
        <Path
            stroke={props.color ?? globalColorVariables.inputText}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default UserIcon;
