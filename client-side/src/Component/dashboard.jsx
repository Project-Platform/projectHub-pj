import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardFooter, Button, Typography } from "@material-tailwind/react";

export function CardDefault() {
  const location = useLocation();
  const responseData = location.state;
  const dataProject = responseData?.data;

  return (
    <div className=" mt-6">
      {responseData && (
            <Typography variant="h5" color="green" className="flex justify-center items-center m-4">
              <h1>{responseData.message}</h1>
            </Typography>
      )}

      {dataProject && (
        <Card className="flex justify-between w-full md:w-full p-4 transition-transform transform hover:scale-105">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
              {dataProject.ideaTitle}
            </Typography>
            <Typography className="mb-4">
              {dataProject.ideaDescription}
            </Typography>
            {/* <Typography variant="h6" color="green" className="font-bold">
              Score: {dataProject.score}
            </Typography> */}
          </CardBody>
          <CardFooter className="pt-2">
            <Button color="blue" className="transition-transform transform hover:scale-105">
              Read More
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default CardDefault;
