import React from "react";

function Error({error}) {
    return error ? (
        <div className="py-3">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold pl-2">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
    ) : null;
}

export default Error
