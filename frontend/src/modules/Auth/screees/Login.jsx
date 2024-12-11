import Chair from "@/assets/images/ChairTwo.png";
import ContentWrapper from "@/components/ContentWrapper.jsx";
import { loginInputFields } from "@/constants/signup.js";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toaster } from "@/helpers/helpers.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import useSession from "@/hooks/useSession.js";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/user/slice.js";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSession();

  const goToProfile = (link = "/profile") => {
    navigate(link);
  };

  useEffect(() => {
    if (data?.status === "Authorized" && data.data.user) {
      dispatch(setUser(data.data.user)); //save user in redux
      goToProfile();
    }
    console.log(data);
  }, [data]);

  const [formData, setFormData] = useState(() => {
    const initialData = loginInputFields.reduce((acc, field) => {
      if (field.name) {
        acc[field.name] = "";
      }
      return acc;
    }, {});

    return initialData;
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("form submitted", formData);
      if (!formData.email || !formData.password) {
        toaster("error", "Please Enter Required Values");
        return;
      }
      try {
        const result = await axios.post(
          "http://localhost:3000/login",
          formData,
        );
        console.log(result);
        Cookies.set("token", result.data.token, { expires: 7, secure: true });
        toaster("success", "Login Successful");
        setTimeout(goToProfile("/"), 2000);
      } catch (err) {
        console.log("error", err);
        toaster("error", err.response.data);
      }
    },
    [formData],
  );

  return (
    <>
      <ContentWrapper className="!max-w-[1280px]">
        <Toaster />
        <main className="overflow-hidden pr-20 bg-white max-md:pr-5">
          <div className="flex gap-5 max-md:flex-col">
            <section className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-16 pt-8 text-2xl font-medium leading-none text-center text-black min-h-[1080px] pb-[1024px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
                <p className="mb-8">
                  {data?.status}
                  3legant<span className="text-zinc-500">.</span>
                </p>
                <img
                  loading="lazy"
                  src={Chair}
                  alt=""
                  className="object-cover inset-0 size-full"
                />
              </div>
            </section>
            <section className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full pt-48">
              <div className="flex flex-col w-full max-md:max-w-full">
                <h1 className="flex items-start w-full text-4xl font-medium tracking-tight leading-none text-neutral-900 max-md:max-w-full">
                  Sign In
                </h1>
                <p className="mt-6 text-left text-base leading-loose text-emerald-400 max-md:max-w-full">
                  <span className="text-zinc-500">
                    Don't have an account yet?
                  </span>{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-emerald-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <form
                className="flex flex-col mt-8 gap-4 w-full text-base leading-loose text-zinc-500 max-md:max-w-full"
                onSubmit={handleLogin}
              >
                {loginInputFields.map((field, index) => (
                  <Input
                    type={field.type}
                    placeholder={field.label}
                    key={index}
                    size="lg"
                    onChange={(e) => handleChange(e)}
                    name={field.name}
                    className="h-[40px]"
                  />
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <Button type="submit" size="lg">
                  Sign In
                </Button>
              </form>
            </section>
          </div>
        </main>
      </ContentWrapper>
    </>
  );
};

export default LoginPage;
