import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface GraaspLogoProps {
  height?: number;
  width?: number;
  color?: string;
}

const GraaspLogo: FC<GraaspLogoProps> = ({
  height = 150,
  width = 150,
  color = '#fff',
}) => {
  return (
    <Svg fill={color} height={height} width={width} viewBox="130 130 290 290">
      <Path
        d="M244.82,228.06c0.22,0.19,0.92,0.72,1.81,0.68c2.44-0.1,4.14-4.11,4.74-5.5c2.89-6.64,6.54-12.9,10.2-19.11
        c5.95-10.11,11.2-21.49,27.16-41.41c6.36-7.95,5.13-6.64,12.73-13.38c3.93-3.49,8.18-6.5,13.05-8.43
        c5.22-2.07,10.46-1.79,14.45,2.33c4.02,4.15,2.41,9.19,0.45,13.9c-1.47,3.55-3.33,5.77-6.53,9.66c-2.22,2.7-3.02,3.58-4.74,5.68
        c-2.16,2.63-5.11,6.6-8.17,12.05c-11.87,21.5-20.29,37.37-21.9,40.89c-0.51,1.11-1.3,3.11-0.72,5.28c0.37,1.36,1.16,2.31,1.7,2.85
        c3.65,0.23,4.12-2.61,5.15-4.69c14.81-29.74,17.63-39.46,38.8-64.84c4.72-5.66,10.67-13.25,15.94-18.39
        c3.74-3.65,7.97-6.76,12.76-8.91c5.9-2.65,13.32-2.01,16.25,1.65c1.12,1.4,1.79,2.81,2.12,4.21c0.88,3.76-0.34,7.39-2.66,11.38
        c-4.27,7.33-9.75,11.81-11.42,13.22c-4.98,4.2-9.28,10.36-17.87,22.68c-15.47,22.17-23.45,47.17-19.99,49.5
        c0.11,0.08,0.53,0.32,1.06,0.31c2.82-0.06,4.75-7.24,5.33-9.24c0.86-2.96,5.68-11.61,15.32-28.91c5.95-10.67,9.69-17.38,16.61-25.13
        c6.83-7.64,16.07-17.88,25.04-15.85c4.06,0.92,7.77,4.36,9.13,8.38c0.49,1.44,1.53,5.04-1.19,11.97
        c-3.35,8.51-8.49,12.27-13.49,17.83c-3.64,4.05-6.92,10.27-13.48,22.71c-4.74,8.99-10.49,21.08-15.91,36
        c-0.44,1.46-1.6,5.56-5.06,7.78c-4.55,2.92-10.4,1.03-12.62,0.4c-12.95-3.68-26.74-0.06-36.48,2.5c0,0-20.71,5.44-35.34,23.22
        c-5.54,6.72-8.95,13.86-9.49,15.04c-2.06,4.52-4.43,10.24-5.24,18.14c-1.6,15.67,4.72,27.61,17.53,36.24
        c21.03,14.16,52.72,10.85,68.14-3.9c2.51-2.4,7.94-7.59,7.32-14.13c-0.47-4.94-4.3-9.79-9.05-11.66c-8.37-3.3-13.35,5.12-28.24,5.88
        c-5.45,0.28-14.2,0.73-19.35-5.39c-5.94-7.07-2.15-18.29-1.92-18.96c1.81-5.2,5.09-8.45,6.87-9.98c5.09-3.5,15.8-9.85,30.65-11.15
        c6.62-0.58,20.02-1.78,33.03,6.43c18.63,11.77,21.77,33.07,22.12,35.75c3.39,25.85-15.21,45.26-22.73,53.09
        c-15.4,16.05-32.76,21.52-42.53,24.47c-8.68,2.62-35.43,10.27-66.12-0.98c-19.47-7.14-31.37-18.54-33.98-21.08
        c-8.04-7.84-14.62-17.11-19.45-27.4c-2.15-4.59-7.03-15.85-9.03-34.26c-4.81-44.27,9.8-87.17,26.29-111.06
        c6.4-9.28,18.61-27.78,24.07-33.39c3.32-3.41,7.45-8.19,18.04-14.15c3.22-1.81,6.57-3.43,10.24-3.78c2.67-0.25,4.66,0.5,5.78,1.97
        c1.24,1.63,1.19,3.89,0.66,6.19c-2.13,9.25-11.81,20.79-18.22,31.46C246.54,214.52,242.13,225.72,244.82,228.06z"
      />
    </Svg>
  );
};

export default GraaspLogo;
