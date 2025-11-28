const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file

const wonders = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer'
];
// const getLocationFromQuery = (query) => {
//     // Make the first API call to get latitude and longitude
    
//     findLatitudeAndLongitude(query)
//         .then((response) => {
//             // `response` is the data returned from the findLatitudeAndLongitude promise

//             // Make the next API call here, where we can use the `response` data from the previous call
//             //   findLocation(response.latitude, response.longitude);
//             console.log('###############');
//             console.log({ [query]: response });
//         })
//         .catch((error) => {
//             console.log('getLocationFromQuery: error fetching location from query!');
//             // console.log(error); // If we want to see more info about the issue
//         });
// };

const findLatitudeAndLongitude = (query) => {
    let latitude, longitude;
    
    // Return the promise chain created by the axios call
    return axios.get('https://us1.locationiq.com/v1/search.php',
        {
            params: {
                key: LOCATIONIQ_KEY,
                q: query,
                format: 'json'
            }
        })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            // console.log('success in findLatitudeAndLongitude!', latitude, longitude);

            // return { latitude, longitude };
            return {latitude,longitude }; // Return the data we want to pass on
        })
        .catch((error) => {
            console.log('error in findLatitudeAndLongitude!');
            // console.log(error); // If we want to see more info about the issue
        });
    
};
async function getAllWonders(locations){
    const result = {};
    for (const location of locations) {
        const data = await findLatitudeAndLongitude(location);
        result[location] = data;
        await new Promise(resolve => setTimeout(resolve,500));
    }
    console.log(result);
}
getAllWonders(wonders)

// const findLocation = (latitude, longitude) => {
//   axios.get('https://us1.locationiq.com/v1/reverse.php',
//     {
//       params: {
//         key: LOCATIONIQ_KEY,
//         format: 'json',
//         lat: latitude,
//         lon: longitude
//       }
//     })
//     .then((response) => {
//       console.log('success in findLocation!', response.data);
//     })
//     .catch((error) => {
//       console.log('error in findLocation!', error);
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

