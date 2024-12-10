import { useEffect, useState } from "react";
import { verifyUser } from "@/lib/verifyUser.js";
import Cookies from "js-cookie";

const useSession = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    const userVerify = async () => {
      const result = await verifyUser();
      console.log("result", result);
      if (result.data.message === "success") {
        setData(result);
      } else {
        setError(result);
      }
    };
    if (token) {
      userVerify();
    }
  }, []);

  console.log("data", data);

  return { data, error };
};

export default useSession;
