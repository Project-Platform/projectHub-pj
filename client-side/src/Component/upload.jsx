import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Typography, Button } from "@material-tailwind/react";
export function Upload() {
  const [descCount, setDescCount] = useState(0);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [field, setField] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [github, setGithub] = useState("");
  const [youtube, setYoutube] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDescChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length > 500) {
      inputValue = inputValue.slice(0, 500);
    }
    setDescCount(inputValue.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://project-hub-pj.vercel.app/project/check", {
        ideaTitle,
        domain,
        field,
        ideaDescription,
        github,
        youtube,
        mentorId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "Project Uploaded successfully."){
        navigate('/dashboard',{state:response.data});
        console.log("Done")
      }
      if (response.data.message=== "Similarity score is high ."){
        navigate('/score',{state: response.data});
      }
      if (response.data.message === "fields are required") {
        setErrorMessage(response.data.missingFields+" all these are required!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    
    setErrorMessage(""); // Clear error message
  };

  return (
    <form className="mt-8 mb-2 max-w-screen-md mx-auto lg:max-w-screen-lg xl:max-w-screen-xl" onSubmit={handleSubmit}>
      {/* Idea Title */}
      <div className="mb-4 w-full">
        <Typography variant="h6" color="blue-gray" className="mb-2 text-center">
          Idea Title
        </Typography>
        <Input
          size="md"
          value={ideaTitle}
          placeholder="Ecopoint"
          className="border-t-blue-gray-200 focus:border-t-gray-900 w-full text-center"
          onChange={(e) => {setIdeaTitle(e.target.value);
            handleChange(e);}}
        />
      </div>

      {/* Domain and Field - Side by Side on Larger Screens */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="w-full lg:w-1/2 mb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2 text-center">
            Domain
          </Typography>
          <Input
            size="md"
            value={domain}
            placeholder="EEE"
            className="border-t-blue-gray-200 focus:border-t-gray-900 w-full text-center"
            onChange={(e) => {setDomain(e.target.value);
              handleChange(e);}}
          />
        </div>
        <div className="w-full lg:w-1/2 mb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2 text-center">
            Field
          </Typography>
          <Input
            size="md"
            value={field}
            placeholder="Machine learning"
            className="border-t-blue-gray-200 focus:border-t-gray-900 w-full text-center"
            onChange={(e) => {setField(e.target.value);
              handleChange(e);}}
          />
        </div>
      </div>

      {/* Idea Description */}
      <div className="mb-4 w-full">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Idea Description
        </Typography>
        <textarea
          value={ideaDescription}
          placeholder="Type here (max 500 characters)"
          maxLength={500}
          style={{ resize: 'none' }}
          className="border border-blue-gray-200 focus:border-gray-900 p-2 w-full h-48 md:h-64 lg:h-96"
          onChange={(e) => {
            handleDescChange(e);
            setIdeaDescription(e.target.value);
            handleChange(e);
          }}
        />
        <div className="text-blue-gray-500 text-right">
          <span>Characters: </span>
          <span id="ideaDescCount">{descCount}</span>/500
        </div>
      </div>

      {/* GitHub Project Link */}
      <div className="mb-4 w-full">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          GitHub Project Link
        </Typography>
        <Input
          size="lg"
          value={github}
          placeholder="https://github.com/Blogs"
          className="border-t-blue-gray-200 focus:border-t-gray-900 w-full"
          onChange={(e) => {setGithub(e.target.value);
            handleChange(e);}}
        />
      </div>

      {/* YouTube Video Link */}
      <div className="mb-4 w-full">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          YouTube Video Link
        </Typography>
        <Input
          value={youtube}
          size="lg"
          placeholder="https://www.youtube.com/watch"
          className="border-t-blue-gray-200 focus:border-t-gray-900 w-full"
          onChange={(e) => {setYoutube(e.target.value);
            handleChange(e);}}
        />
      </div>

      {/* Mentor ID */}
      <div className="mb-4 w-full">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Mentor ID
        </Typography>
        <Input
          value={mentorId}
          size="lg"
          placeholder="Ankur, Ansh.."
          className="border-t-blue-gray-200 focus:border-t-gray-900 w-full"
          onChange={(e) => {setMentorId(e.target.value);
            handleChange(e);}}
        />
      </div>
      {errorMessage && (
              <Typography variant="h6" color="red" className="text-center">
                {errorMessage}
              </Typography>
            )}

      {/* Submit Button */}
      <Button type="submit" className="mt-6 w-full lg:w-1/2 mb-4">
        Check for Plagiarism
      </Button>
    </form>
  );
}

export default Upload;
