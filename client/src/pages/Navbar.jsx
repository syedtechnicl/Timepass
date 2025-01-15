import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
        });
      }
      navigate("/Login");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An unexpected error occurred",
        status: "error",
      });
    }
  };
  return (
    <>
      <div className="bg-gray-600">
        <div className=" flex items-center justify-between p-2">
          <h1
            className="font-bold
            text-lg"
          >
            {"Patel MernStack"}
          </h1>
          <Button
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
