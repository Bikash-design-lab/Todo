import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ScaleLoader color="black" height={35} width={4} radius={2} margin={2} />

            <b>Loading...</b>
        </div>
    );
};

export default Loader;
