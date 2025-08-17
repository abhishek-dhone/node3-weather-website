import request from "request";

const geocoding = (location, callback) => {
  request(
    {
      url: `https://api.maptiler.com/geocoding/${location}.json?key=7A1FlAjA0Nh2QrgIO4oG&limit=1`,
      json: true,
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (
        body === "Not found" ||
        body.features.length === 0
      ) {
        callback("Unable to find location. Try another!", undefined);
      } else if (
        body ===
        "Invalid key - Get your FREE key at https://cloud.maptiler.com/account/keys/"
      ) {
        callback("Invalid Key!", undefined);
      } else {
        callback(undefined, {
          Longitude: body.features[0].center[0],
          Latitude: body.features[0].center[1],
          Address: body.features[0].place_name,
        });
      }
    }
  );
};

export default {
  geocoding,
};
