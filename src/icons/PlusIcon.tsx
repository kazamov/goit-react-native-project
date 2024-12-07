import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import { globalColorVariables } from '@/styles/variables';

const PlusIcon = (props: SvgProps) => (
    <Svg {...props} width={25} height={25} fill="none">
        <Circle
            cx={12.5}
            cy={12.5}
            r={12}
            fill={globalColorVariables.white}
            stroke={globalColorVariables.primary}
        />
        <Path
            fill={globalColorVariables.primary}
            fillRule="evenodd"
            d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default PlusIcon;
