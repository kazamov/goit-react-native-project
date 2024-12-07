import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

import { globalColorVariables } from '@/styles/variables';

const CrossIcon = (props: SvgProps) => (
    <Svg {...props} width={25} height={25} fill="none">
        <Circle
            cx={12.5}
            cy={12.5}
            r={12}
            fill={globalColorVariables.white}
            stroke={globalColorVariables.gray2}
        />
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.25736 7.55025L7.55026 8.25736L11.7929 12.5L7.55026 16.7426L8.25736 17.4497L12.5 13.2071L16.7426 17.4497L17.4498 16.7426L13.2071 12.5L17.4498 8.25736L16.7426 7.55025L12.5 11.7929L8.25736 7.55025Z"
            fill={globalColorVariables.gray3}
        />
    </Svg>
);
export default CrossIcon;
