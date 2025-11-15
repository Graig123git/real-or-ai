import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UserIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#DEE1E6' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M18 21V19C18 18.2044 17.6837 17.4415 17.1211 16.8789C16.6289 16.3867 15.9835 16.0829 15.2969 16.0146L15 16L9 16C8.20435 16 7.44152 16.3163 6.87891 16.8789C6.3163 17.4415 6 18.2044 6 19V21C6 21.5523 5.55228 22 5 22C4.44772 22 4 21.5523 4 21L4 19C4 17.6739 4.52716 16.4025 5.46484 15.4648C6.40253 14.5272 7.67392 14 9 14L15 14L15.248 14.0059C16.4838 14.0672 17.6561 14.5858 18.5352 15.4648C19.4728 16.4025 20 17.6739 20 19V21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21Z" 
        fill={color}
      />
      <Path 
        d="M15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7ZM17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" 
        fill={color}
      />
    </Svg>
  );
};

export default UserIcon;
