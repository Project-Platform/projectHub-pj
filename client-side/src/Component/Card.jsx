import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";

export function ProfileCard() {
  return (
    <div className="flex md:flex items-center justify-center md:space-x-4 min-h-screen">
      <Link to="/admin">
        <Card className="w-full md:w-72 border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <CardHeader
            floated={false}
            className="h-64 rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Admin
            </Typography>
          </CardBody>
        </Card>
      </Link>

      {/* <Link to="/mentor">
        <Card className="w-full md:w-72 border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <CardHeader
            floated={false}
            className="h-64 rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Mentor
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/student">
        <Card className="w-full md:w-72 border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <CardHeader
            floated={false}
            className="h-64 rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Student
            </Typography>
          </CardBody>
        </Card>
      </Link> */}
    </div>
  );
}



export default ProfileCard;
