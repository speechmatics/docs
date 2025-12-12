import React from 'react';

interface DevIconProps {
  name: string;
  size?: number;
}

const DevIcon: React.FC<DevIconProps> = ({ name, size = 24 }) => {
  const style = { fontSize: `${size}px` };
  return <i className={`devicon-${name}-plain`} style={style} />;
};

export default DevIcon;



