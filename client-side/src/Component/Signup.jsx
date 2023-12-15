
import {
    Card,
    Input,
    Button,
    Typography,
    
  } from "@material-tailwind/react";
  import { useState } from "react";
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  export function SimpleRegistrationForm() {
    const [university, setuniversity] = useState(""); 
    const [rollNo,setrollNo]= useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [gmail, setgmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try{
        const response= await axios.post("http://localhost:8080/user/register",{
          university,
          rollNo,
          username,
          password,
          gmail,
      }, {
        headers:{
          "Content-Type": "application/json",
        },
      });
      if (response.data.message ==='University has already registered'){
        setErrorMessage("University has already registered.Try logIn");
      }
      if (response.data.message ==='Username already exist.'){
        setErrorMessage("Username already exist.");
      }
      if (response.data.message ==='Password must contain at least one capital letter, one number, and one special character(!@#$%^&*)'){
        setErrorMessage("Password must contain at least one capital letter, one number, and one special character(!@#$%^&*)");
      }
      if(response.data.message ==='Duplicate key for gmail'){
        setErrorMessage("This gmail was already being registered");
      }
      if(response.data.message ==='fields are required'){
        setErrorMessage(response.data.missingFields+" fields are required");
      }
      if (response.data.message ==='User registered successfully.'){
        navigate('/upload')
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    
    setErrorMessage(""); // Clear error message
  };
    return (
      <div className="flex justify-center items-center h-screen m-2">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter University details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
              University Name
            </Typography>
            <Input
              value={university}
              size="lg"
              placeholder="Keshav Memorial Institute of Technology"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                setuniversity(e.target.value);
                handleChange(e);
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
               Roll number
            </Typography>
            <Input
            value={rollNo}
              size="lg"
              placeholder="name_1"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) =>{ setrollNo(e.target.value);
                handleChange(e);
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
               Username
            </Typography>
            <Input
            value={username}
              size="lg"
              placeholder="name_1"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) =>{ setusername(e.target.value);
                handleChange(e);
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={password}
              // type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {setpassword(e.target.value);
                handleChange(e);}}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
            value={gmail}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {setgmail(e.target.value);
                handleChange(e);}}
            />
            {errorMessage && (
              <Typography variant="h6" color="red" className="text-center">
                {errorMessage}
              </Typography>
            )}
            
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Sign Up
           </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Log In
            </a>
          </Typography>
        </form>
      </Card>
      </div>
    );
  }
  export default SimpleRegistrationForm;