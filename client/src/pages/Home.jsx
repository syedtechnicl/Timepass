// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";

// const Home = () => {
//   const [title, setTitle] = useState("");
//   const [description, setdescription] = useState("");
//   const { toast } = useToast();
//   const addTodoHandler = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/v1/todo`,
//         { title, description },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       console.log(res);

//       if (res.data.success) {
//         toast({
//           title: "Success",
//           description: res.data.message,
//           status: "success",
//         });
//         setTitle(""); // Reset the title input
//         setDescription(""); // Reset the description input
//       }
//     } catch (err) {
//       console.error(err.response?.data?.message || err.message);
//       toast({
//         title: "Error",
//         description:
//           err.response?.data?.message || "An unexpected error occurred.",
//         status: "error",
//       });
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center gap-5 mt-5">
//         <div className="w-full m-2 px-2">
//           <Input
//             type="text"
//             placeholder="Add a new Todo..."
//             className="w-1/3 mb-3"
//             value={title}
//             onChange={(e) => {
//               setTitle(e.currentTarget.value);
//             }}
//           />
//           <Textarea
//             value={description}
//             onChange={(e) => {
//               setdescription(e.currentTarget.value);
//             }}
//             placeholder="Write A Description..."
//           />
//         </div>
//         <Button
//           onClick={() => {
//             addTodoHandler();
//           }}
//           className="mt-10"
//         >
//           Add Todo 🚀
//         </Button>
//       </div>
//     </>
//   );
// };

// export default Home;

// // // gpt
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const addTodoHandler = async () => {
    // Validate inputs
    if (!title || !description) {
      toast({
        title: "Validation Error",
        description: "Both title and description are required!",
        status: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/todo`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      // Check success condition
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
        });
        setTitle(""); // Reset the title input
        setDescription(""); // Reset the description input
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast({
        title: "Error",
        description:
          err.response?.data?.message || "An unexpected error occurred.",
        status: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center gap-5 mt-5">
        <div className="w-full m-2 px-2">
          <Input
            type="text"
            placeholder="Add a new Todo..."
            className="w-1/3 mb-3"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Write A Description..."
            className="w-1/3 mb-3"
          />
        </div>
        <Button onClick={addTodoHandler} className="mt-10">
          Add Todo 🚀
        </Button>
      </div>
    </>
  );
};

export default Home;
