import { globalColorVariables } from '@/styles/variables';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowUpIcon = (props: SvgProps) => (
    <Svg width={12} height={16} fill="none" {...props}>
        <Path
            fill={globalColorVariables.white}
            d="m6 1 .354-.354a.5.5 0 0 0-.708 0L6 1Zm4.646 5.354a.5.5 0 0 0 .708-.708l-.708.708Zm-10-.708a.5.5 0 1 0 .708.708l-.708-.708ZM5.5 15a.5.5 0 0 0 1 0h-1Zm.146-13.646 5 5 .708-.708-5-5-.708.708Zm0-.708-5 5 .708.708 5-5-.708-.708ZM5.5 1v7h1V1h-1Zm0 7v7h1V8h-1Z"
        />
    </Svg>
);
export default ArrowUpIcon;
