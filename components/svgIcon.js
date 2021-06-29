import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgIcon = (props) => {

    if(props.icon == 'LocationMark')
        return (
            <Svg width="150" height="150" viewBox="0 0 150 151" fill="none">
                <Path d="M0 75.5725C0 34.1719 33.5994 0.57251 75 0.57251C116.401 0.57251 150 34.1719 150 75.5725C150 116.973 116.401 150.573 75 150.573C33.5994 150.573 0 116.973 0 75.5725ZM145.522 75.5725C145.522 36.6448 113.928 5.05012 75 5.05012C36.0723 5.05012 4.47761 36.6448 4.47761 75.5725C4.47761 114.5 36.0723 146.095 75 146.095C113.928 146.095 145.522 114.5 145.522 75.5725Z" fill="#484A59"/>
                <Path d="M53.8169 74.5228C53.8169 62.1385 63.8136 52.0991 76.1451 52.0991C88.4767 52.0991 98.4734 62.1385 98.4734 74.5228C98.4734 82.0832 94.4489 89.4928 87.8138 96.5266C85.5386 98.9384 83.1077 101.136 80.6759 103.08C80.2497 103.421 79.8383 103.742 79.4442 104.043L78.3159 104.883L77.3837 105.539C76.6337 106.041 75.6566 106.041 74.9066 105.539L73.9744 104.883C73.2599 104.364 72.4668 103.762 71.6143 103.08C69.1826 101.136 66.7516 98.9384 64.4765 96.5266C57.8413 89.4928 53.8169 82.0832 53.8169 74.5228ZM94.0077 74.5228C94.0077 64.6154 86.0104 56.5839 76.1451 56.5839C66.2799 56.5839 58.2825 64.6154 58.2825 74.5228C58.2825 80.6969 61.7939 87.1619 67.7184 93.4422C69.8391 95.6903 72.118 97.7501 74.3961 99.5719C74.7941 99.8902 75.1775 100.189 75.5438 100.469L76.1451 100.92L77.3084 100.035L77.8942 99.5719C80.1723 97.7501 82.4512 95.6903 84.5719 93.4422C90.4964 87.1619 94.0077 80.6969 94.0077 74.5228Z" fill="#484A59"/>
                <Path d="M66.4121 74.9999C66.4121 69.9408 70.5133 65.8396 75.5724 65.8396C80.6315 65.8396 84.7327 69.9408 84.7327 74.9999C84.7327 80.059 80.6315 84.1602 75.5724 84.1602C70.5133 84.1602 66.4121 80.059 66.4121 74.9999ZM80.1526 74.9999C80.1526 72.4704 78.102 70.4198 75.5724 70.4198C73.0429 70.4198 70.9923 72.4704 70.9923 74.9999C70.9923 77.5295 73.0429 79.5801 75.5724 79.5801C78.102 79.5801 80.1526 77.5295 80.1526 74.9999Z" fill="#484A59"/>
            </Svg>
        );
    
    if(props.icon == 'Plus')
        return (
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path d="M8.99327 0.883379C8.93551 0.38604 8.51284 0 8 0C7.44772 0 7 0.447715 7 1V7H1L0.883379 7.00673C0.38604 7.06449 0 7.48716 0 8C0 8.55229 0.447715 9 1 9H7V15L7.00673 15.1166C7.06449 15.614 7.48716 16 8 16C8.55229 16 9 15.5523 9 15V9H15L15.1166 8.99327C15.614 8.93551 16 8.51284 16 8C16 7.44772 15.5523 7 15 7H9V1L8.99327 0.883379Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'Filter')
        return (
            <Svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                <Path d="M21 1H1L9 10.46V17L13 19V10.46L21 1V1Z" stroke="#BBBCBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>

        );

    if(props.icon == 'Back')
        return (
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <Path d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z" fill="#BBBCBD"/>
            </Svg>
        );

    if(props.icon == 'Camera')
        return (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.17 5L9 3H15L16.83 5H20C21.1 5 22 5.9 22 7V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V7C2 5.9 2.9 5 4 5H7.17ZM7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 10.24 14.76 8 12 8C9.24 8 7 10.24 7 13Z" fill="#4A90E2"/>
                <Path d="M12 17L13.25 14.25L16 13L13.25 11.75L12 9L10.75 11.75L8 13L10.75 14.25L12 17Z" fill="#4A90E2"/>
            </Svg>

        );

    if(props.icon == 'Close')
        return (
            <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <Path d="M1.6129 0.209705C1.22061 -0.0953203 0.653377 -0.0675907 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929L0.209705 12.3871C-0.0953203 12.7794 -0.0675907 13.3466 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071L12.3871 13.7903C12.7794 14.0953 13.3466 14.0676 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711L13.7903 1.6129C14.0953 1.22061 14.0676 0.653377 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893L1.6129 0.209705Z" fill="#C3C4C5"/>
            </Svg>

        );

    if(props.icon == 'Edit')
        return (
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path d="M13.7938 0.914285L1.2938 13.4143C1.16564 13.5424 1.07473 13.703 1.03077 13.8789L0.0307676 17.8789C-0.152328 18.6112 0.511065 19.2746 1.24345 19.0915L5.24345 18.0915C5.41928 18.0476 5.57986 17.9567 5.70802 17.8285L18.208 5.3285C18.9965 4.53998 19.3045 3.39068 19.0159 2.31353C18.7273 1.23639 17.8859 0.395047 16.8088 0.106428C15.7316 -0.182192 14.5823 0.125761 13.7938 0.914285ZM16.2911 2.03828C16.6781 2.14196 16.9803 2.44421 17.084 2.83117L17.1107 2.96091C17.161 3.30828 17.0456 3.66249 16.7938 3.91428L4.48891 16.2174L2.37491 16.7464L2.90391 14.6324L15.208 2.3285C15.4598 2.0767 15.814 1.96131 16.1614 2.0116L16.2911 2.03828ZM20.0009 18.1214C20.0009 17.5691 19.5532 17.1214 19.0009 17.1214H10.0009L9.88429 17.1281C9.38695 17.1859 9.00091 17.6086 9.00091 18.1214C9.00091 18.6737 9.44862 19.1214 10.0009 19.1214H19.0009L19.1175 19.1147C19.6149 19.0569 20.0009 18.6342 20.0009 18.1214Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'Logo')
        return (
            <Svg width="681" height="680" viewBox="0 0 681 680" fill="none">
                <Path d="M150.584 57.9626L213.584 186.433L214.004 187.411C214.422 188.403 214.823 189.406 215.207 190.42L215.585 191.439L216.055 192.764C230.961 235.879 209.117 283.076 166.7 299.661C162.171 301.19 157.742 302.991 153.436 305.045C98.6666 331.001 71.3855 394.504 91.5693 452.71L92.1955 454.472L92.8893 456.331C116.006 516.775 182.989 548.005 244.149 526.85L246.001 526.193L246.469 526.018L246.464 526.006C277.624 514.54 303.757 490.307 316.702 457.465L316.919 457.535L318.708 451.985L319.225 450.437C319.456 449.727 319.68 449.015 319.897 448.304L388.908 234.357L388.494 234.224L393.701 218.078L393.872 218.136C394.216 216.758 394.596 215.381 395.013 214.007L395.993 210.974C411.035 167.212 458.454 143.436 502.635 157.791C547.281 172.297 571.715 220.25 557.208 264.897C549.839 287.577 533.838 305.042 514.024 314.834C511.307 316.17 508.49 317.371 505.58 318.43L505.194 318.566L505.185 318.541C505.106 318.57 505.028 318.598 504.949 318.626L504.713 318.712C442.436 341.379 410.326 410.24 432.993 472.517C434.139 475.668 435.404 478.741 436.781 481.734L436.825 481.71L511.471 633.93C456.24 666.126 391.316 683.13 322.706 679.534C135.186 669.706 -8.86151 509.725 0.965968 322.206C6.77779 211.309 65.1038 115.617 150.584 57.9626ZM358.294 0.465856C545.814 10.2933 689.862 170.275 680.034 357.794C674.465 464.059 620.676 556.364 540.982 614.617L467.883 465.553L467.877 465.54C467.165 463.908 466.499 462.243 465.882 460.547L465.412 459.222C450.506 416.107 472.35 368.91 514.766 352.325C519.296 350.795 523.725 348.995 528.031 346.941C583.353 320.722 610.63 256.195 589.271 197.514L588.577 195.655C565.228 134.6 497.12 103.353 435.466 125.793L434.998 125.968L435.002 125.98C403.843 137.446 377.709 161.679 364.765 194.52L364.548 194.451L362.758 200L362.241 201.549C362.011 202.259 361.787 202.97 361.57 203.682L292.559 417.628L292.973 417.762L287.765 433.907L287.594 433.85C287.25 435.228 286.871 436.605 286.454 437.979L285.473 441.012C270.432 484.774 223.013 508.55 178.832 494.195C134.185 479.688 109.752 431.735 124.259 387.089C131.628 364.408 147.629 346.944 167.442 337.151C169.82 335.983 172.274 334.917 174.8 333.96L175.887 333.556L176.271 333.419L176.282 333.444C176.36 333.416 176.439 333.388 176.518 333.359L176.753 333.274C239.031 310.607 271.141 241.746 248.474 179.468C247.491 176.768 246.421 174.124 245.269 171.539L244.686 170.252L244.64 170.274L180.681 39.8458C231.873 12.5262 290.694 -2.02445 352.677 0.217082L358.294 0.465856Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'CheckCircle')
        return (
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0Z" fill="#ECB296"/>
                <Path d="M6.67857 11L4 8.60077L4.75536 7.92418L6.67857 9.64203L10.7446 6L11.5 6.68138L6.67857 11Z" fill="white"/>
            </Svg>

        );

    if(props.icon == 'NumpadBack')
        return (
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <Path d="M11.67 1.77L9.9 0L0 9.9L9.9 19.8L11.67 18.03L3.54 9.9L11.67 1.77Z" fill="#0F1112"/>
            </Svg>

        );

    if(props.icon == 'CalendarPrev')
        return (
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <Path opacity="0.7" d="M11.67 1.86998L9.9 0.0999756L0 9.99998L9.9 19.9L11.67 18.13L3.54 9.99998L11.67 1.86998Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'CalendarNext')
        return (
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <Path opacity="0.7" d="M0.33 1.86998L2.1 0.0999756L12 9.99998L2.1 19.9L0.33 18.13L8.46 9.99998L0.33 1.86998Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'PickerMark')
        return (
            <Svg width="19" height="12" viewBox="0 0 19 12" fill="none">
                <Path d="M0 0H19L9.5 11.3828L0 0Z" fill="#484A59"/>
            </Svg>
        );

    if(props.icon == 'WarningMark')
        return (
            <Svg width="24" height="21" viewBox="0 0 24 21" fill="none">
                <Path d="M9.435 2.34133C9.97885 1.44475 10.9514 0.897217 12 0.897217C13.0486 0.897217 14.0212 1.44475 14.5679 2.34609L23.046 16.4999C23.579 17.423 23.5822 18.5596 23.0544 19.4857C22.5265 20.4118 21.5469 20.9882 20.47 21L3.51901 20.9999C2.45313 20.9882 1.47351 20.4118 0.945653 19.4857C0.417794 18.5596 0.420976 17.423 0.962137 16.4861L9.435 2.34133ZM12.855 3.37859C12.6737 3.07973 12.3495 2.89722 12 2.89722C11.6505 2.89722 11.3263 3.07973 11.1479 3.37383L2.68599 17.5C2.50832 17.8077 2.50725 18.1866 2.68321 18.4953C2.85916 18.804 3.1857 18.9961 3.53 19L20.459 19C20.8143 18.9961 21.1408 18.804 21.3168 18.4953C21.4928 18.1866 21.4917 17.8077 21.3221 17.5138L12.855 3.37859ZM12 6.99996C12.5128 6.99996 12.9355 7.386 12.9933 7.88334L13 7.99996V12C13 12.5522 12.5523 13 12 13C11.4872 13 11.0645 12.6139 11.0067 12.1166L11 12V7.99996C11 7.44768 11.4477 6.99996 12 6.99996ZM13.01 16C13.01 15.4477 12.5623 15 12.01 15L11.8834 15.0067C11.386 15.0645 11 15.4871 11 16C11 16.5522 11.4477 17 12 17L12.1266 16.9932C12.624 16.9355 13.01 16.5128 13.01 16Z" fill="#F92928"/>
            </Svg>
        );

    if(props.icon == 'Search')
        return (
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path d="M6.65527 12.8794C7.9502 12.8794 9.14551 12.4727 10.1333 11.7837L13.7607 15.4194C13.9517 15.6021 14.2007 15.6934 14.458 15.6934C15.0225 15.6934 15.4209 15.27 15.4209 14.7222C15.4209 14.4648 15.3379 14.2158 15.147 14.0249L11.5444 10.4141C12.2998 9.40137 12.7397 8.14795 12.7397 6.79492C12.7397 3.44971 10.0088 0.710449 6.65527 0.710449C3.31006 0.710449 0.570801 3.44971 0.570801 6.79492C0.570801 10.1401 3.31006 12.8794 6.65527 12.8794ZM6.65527 11.46C4.09863 11.46 1.99023 9.35156 1.99023 6.79492C1.99023 4.23828 4.09863 2.12988 6.65527 2.12988C9.22021 2.12988 11.3286 4.23828 11.3286 6.79492C11.3286 9.35156 9.22021 11.46 6.65527 11.46Z" fill="#8C8D8E"/>
            </Svg>
        );

    if(props.icon == 'CheckLogo')
        return (
            <Svg width="156" height="156" viewBox="0 0 156 156" fill="none">
                <Path d="M0.692383 78C0.692383 35.3255 35.3256 0.692261 78.0001 0.692261C120.675 0.692261 155.308 35.3255 155.308 78C155.308 120.674 120.675 155.308 78.0001 155.308C35.3256 155.308 0.692383 120.674 0.692383 78ZM150.692 78C150.692 37.8745 118.126 5.30765 78.0001 5.30765C37.8746 5.30765 5.30777 37.8745 5.30777 78C5.30777 118.125 37.8746 150.692 78.0001 150.692C118.126 150.692 150.692 118.125 150.692 78Z" fill="#FEFFFE"/>
                <Path d="M71.0767 97.6153L53.769 79.8979L58.6498 74.9016L71.0767 87.5873L97.3498 60.6923L102.231 65.724L71.0767 97.6153Z" fill="#FEFFFE"/>
            </Svg>
        );

    if(props.icon == 'Forward')
        return (
            <Svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <Path d="M2 0L0.589996 1.41L5.17 6L0.589996 10.59L2 12L8 6L2 0Z" fill="#BBBCBD"/>
            </Svg>
        );

    if(props.icon == 'SmallCheck')
        return (
            <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <Path d="M10.0264 0.180242C10.2667 -0.0600806 10.6564 -0.0600806 10.8967 0.180242C11.1185 0.402078 11.1356 0.751144 10.9479 0.992554L10.8967 1.05053L4.12745 7.81976C3.90561 8.04159 3.55655 8.05866 3.31514 7.87095L3.25716 7.81976L0.180242 4.74284C-0.0600806 4.50251 -0.0600806 4.11287 0.180242 3.87255C0.402078 3.65071 0.751144 3.63365 0.992554 3.82136L1.05053 3.87255L3.69231 6.51385L10.0264 0.180242Z" fill="#FEFFFF"/>
            </Svg>
        );

    if(props.icon == 'Duplicate')
        return (
            <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                <Path d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM17 4H6C4.9 4 4 4.9 4 6V20C4 21.1 4.9 22 6 22H17C 18.1 22 19 21.1 19 20V6C19 4.9 18.1 4 17 4ZM6 20H17V6H6V20Z" fill="#525464"/>
            </Svg>
        );

    if(props.icon == 'CheckBox_Checked')
        return (
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <Path d="M2 0H16C17.11 0 18 0.9 18 2V16C18 17.1 17.11 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0ZM2 9L7 14L16 5L14.59 3.58L7 11.17L3.41 7.59L2 9Z" fill="#ECB296"/>
            </Svg>
        );

    if(props.icon == 'CheckBox_Unchecked')
        return (
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <Path opacity="0.5" d="M2 0H16C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0ZM16 16V2H2V16H16Z" fill="#484A59"/>
            </Svg>
        );

    return null;
}

export default SvgIcon;