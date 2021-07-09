import axios from "axios";

const authCredentials = {
  refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
  grant_type: "refresh_token",
};

// eslint-disable-next-line import/prefer-default-export
export async function getAccessToken() {
  const {
    data: { accessToken },
  } = await axios.post(
    `${process.env.REACT_APP_BACKEND_SERVER}/token`,
    authCredentials
  );
  return accessToken;
}
