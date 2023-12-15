import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export function CardDefault() {
  const location = useLocation();
  const responseData = location.state;

  return (
      <Card className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
          {responseData && (
        <div>
          {/* Render your data here */}
          <h1>{responseData.message}</h1>
          {/* Add more JSX to display other properties from responseData */}
        </div>
      )}
          </Typography>
        </CardBody>
      </Card>
  );
}

export default CardDefault;
