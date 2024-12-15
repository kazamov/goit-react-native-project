import { globalColorVariables } from '@/styles/variables';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowLeft = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke={globalColorVariables.inputText}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            d="M20 12H4M10 18l-6-6 6-6"
        />
    </Svg>
);

export default ArrowLeft;
