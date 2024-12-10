import Cookies from "js-cookie";
import axios from "axios";

export const verifyUser = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const result = await axios.post(
        "http://localhost:3000/verify",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        },
      );
      return {
        status: "Authorized",
        data: result.data,
      };
    } catch (err) {
      return {
        status: "Error",
        data: err,
      };
    }
  } else {
    return {
      status: "Unauthorized",
    };
  }
};
