import React, { useState } from 'react';

const EmergencyButton = ({ onEmergencyCall }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onEmergencyCall();
    } catch (error) {
      console.error('Error during emergency call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={isLoading}
      style={{
        backgroundColor: isLoading ? 'grey' : 'red',
        color: 'white',
        padding: '15px 30px',
        margin: '15px 30px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '5px',
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
    >
      {isLoading ? 'Contacting...' : 'Emergency Call'}
      
    </button>
  );
};

export default EmergencyButton;