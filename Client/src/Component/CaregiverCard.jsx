// import React from 'react';

// import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui';


// const CaregiverCard = ({ caregiver }) => {
//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader>
//         <CardTitle>{caregiver.name}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p>Age: {caregiver.age}</p>
//         <p>Experience: {caregiver.experience} years</p>
//         <p>Specialties: {caregiver.specialties.join(', ')}</p>
//         <p>Hourly Rate: ${caregiver.hourlyRate}</p>
//         <p>Location: {caregiver.location}</p>
//         <p>Languages: {caregiver.languages.join(', ')}</p>
//         <p>Rating: {caregiver.rating}/5</p>
//       </CardContent>
//     </Card>
//   );
// };

// export default CaregiverCard;
import React from 'react';

const CaregiverCard = ({ caregiver }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  };

  const infoStyle = {
    margin: '4px 0',
    fontSize: '0.9rem',
    color: '#666',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
  };

  const starStyle = {
    color: '#ffc107',
    marginRight: '4px',
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{caregiver.name}</h2>
      <p style={infoStyle}>Age: {caregiver.age}</p>
      <p style={infoStyle}>Experience: {caregiver.experience} years</p>
      <p style={infoStyle}>Specialties: {caregiver.specialties.join(', ')}</p>
      <p style={infoStyle}>Hourly Rate: ${caregiver.hourlyRate}</p>
      <p style={infoStyle}>Location: {caregiver.location}</p>
      <p style={infoStyle}>Languages: {caregiver.languages.join(', ')}</p>
      <div style={ratingStyle}>
        <span style={starStyle}>★</span>
        <span>{caregiver.rating.toFixed(1)}/5</span>
      </div>
    </div>
  );
};

export default CaregiverCard;