import { globalColorVariables } from '@/styles/variables';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PostsIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path fill={globalColorVariables.white} d="M0 0h24v24H0z" />
        <Path
            stroke={props.color ?? globalColorVariables.inputText}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            d="M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM14 14h7v7h-7v-7ZM3 14h7v7H3v-7Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default PostsIcon;
