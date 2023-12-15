import {
    Button,
    Input,
  } from "@material-tailwind/react";
   
  export function NavbarDark() {
    return (
        <div className="flex  justify-center h-screen">
          <div className="relative flex  w-full gap-2 md:w-max">
            <Input
              type="search"
              color="gray"
              label="Type here..."
              className="pr-20 py-3 px-4 min-w-[288px] md:w-[400px] text-lg"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="gray"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </div>
    );
  }
  export default NavbarDark;