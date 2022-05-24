// import React, { useState, useEffect } from 'react';

// const useGeoLocation = () => {
//   const [position, setPosition] = useState < GeolocationPosition > null;
//   const [error, setError] = (useState < string) | (null > null);
//   const [loading, setLoading] = useState < boolean > false;

//   useEffect(() => {
//     const { geolocation } = navigator;
//     if (!geolocation) {
//       setError('The browser does not support geolocation');
//       return;
//     }

//     setLoading(true);
//     geolocation.getCurrentPosition(
//       (position) => {
//         setPosition(position);
//         setError(null);
//         setLoading(false);
//       },
//       (error) => {
//         setError(error.message);
//         setLoading(false);
//       }
//     );
//   }, []);

//   return { position, error, loading };
// };

// const GeopositionUI = () => {
//   const { error, loading, position } = useGeoLocation();

//   if (error) return <div>{error}</div>;

//   if (loading) return <div>Loading Geoposition...</div>;

//   if (!position) return <div>No Position</div>;

//   return (
//     <div>
//       <div>Latitude: {position.coords.latitude}</div>
//       <div>Longitude: {position.coords.longitude}</div>
//     </div>
//   );
// };
