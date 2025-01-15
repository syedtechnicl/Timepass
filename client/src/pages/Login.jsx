// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";
// import React, { useState } from "react";

// const Login = () => {
//   const { toast } = useToast();
//   const [user, setuser] = useState({
//     email: "",
//     password: "",
//   });

//   const changeHandler = (e) => {
//     setuser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
//   };

//   const loginHandler = async () => {
//     // console.log(user);
//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/v1/user/login`,
//         user
//       );
//       console.log(res);
//       if (res.success) {
//         // toast.success(res.data.message);
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error.res.data.message);
//     }
//   };

//   return (
//     <>
//       <div className="">
//         <Input
//           name="email"
//           onChange={changeHandler}
//           value={user.email}
//           type="email"
//           placeholder="Email"
//         />
//         <Input
//           name="password"
//           onChange={changeHandler}
//           value={user.password}
//           type="password"
//           placeholder="password"
//         />
//         <Button
//           onClick={() => {
//             loginHandler();
//           }}
//         >
//           Login
//         </Button>
//       </div>
//     </>
//   );
// };

// export default Login;

// gpt
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
        });
      } else {
        alert("Login failed!");
      }
      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An unexpected error occurred",
        status: "error",
      });
    }
  };

  return (
    <div>
      <Input
        name="email"
        onChange={changeHandler}
        value={user.email}
        type="email"
        placeholder="Email"
      />
      <Input
        name="password"
        onChange={changeHandler}
        value={user.password}
        type="password"
        placeholder="Password"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
