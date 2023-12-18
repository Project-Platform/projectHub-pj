import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

export function CardDefault() {
  const location = useLocation();
  const responseData = location.state;
  const dataProject = responseData?.data || [];

  return (
    <div>
      {responseData && (
        <div className="mb-6 m-6">
          {/* Render your data here */}
          <Typography variant="h3" color="blue-gray" className="mb-4 font-bold">
            {responseData.message}
          </Typography>
          {/* Add more JSX to display other properties from responseData */}
        </div>
      )}
      <h1 className="m-6">
        Similar projects which were uploaded on our website:
      </h1>
      <div>
        {dataProject.map((project, index) => (
          <Card
            key={index}
            className="w-{full-6} md:w-{full-6} p-4 transition-transform transform hover:scale-105"
          >
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 font-bold"
              >
                {project.ideaTitle}
              </Typography>
              <Typography className="mb-4">
                {project.ideaDescription}
              </Typography>
              <Typography variant="h6" color="green" className="font-bold">
                Score: {(project.score * 100).toFixed(2)}
              </Typography>
            </CardBody>
            <CardFooter className="pt-2">
              <Button
                color="blue"
                className="transition-transform transform hover:scale-105"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardDefault;
