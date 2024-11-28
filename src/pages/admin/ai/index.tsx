import React from 'react';
// import { Typography } from 'antd';

// const { Title } = Typography;

const AIPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <Title level={2}>AI Dashboard</Title> */}
      <iframe 
        src="https://dbai.karamentreprises.com"
        style={{
          width: '100%',
          height: 'calc(100vh - 110px)', // Adjust height to account for header/padding
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}
        title="AI Dashboard"
        allowFullScreen
      />
    </div>
  );
};

export default AIPage;