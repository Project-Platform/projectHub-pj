import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
  export function LoginCard() {
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate();
    const handleSubmit=async (event)=>{
      event.preventDefault();
      try{
        const response= await axios.post("http://localhost:8080/user/login",{
          username,
          password,
      }, {
        headers:{
          "Content-Type": "application/json",
        },
      });
      if (response.data.token && response.data.adminID){
        navigate('/upload')
      }
      if (response.data.message==='Username does not exist'){
        setErrorMessage("Username does not exist.Try logIn");
      }
      if (response.data.message==='password is incorrect'){
        setErrorMessage("password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    setErrorMessage(""); // Clear error message
  };
    return (
        <form className="flex justify-center items-center h-screen "onSubmit={handleSubmit}>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
              UserName
            </Typography>
            <Input
              size="lg"
              value={username}
              placeholder="name_1"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                setusername(e.target.value);
                handleChange(e); // Call your custom handler
              }}
            />
            
          <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              value={password}
              placeholder="*******"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                setpassword(e.target.value);
                handleChange(e); // Call your custom handler
              }}
            />
            {errorMessage && (
            <Typography variant="body" color="red" className="text-center">
              {errorMessage}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Login
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
      </form>
    );
  }
export default LoginCard;