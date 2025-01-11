import React, { useState } from "react";

const SiteLogin = () => {
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");

    // Fetch credentials from localStorage
    const credential = JSON.parse(localStorage.getItem("credential")) || [];

    const handleChange = ({ target: { value } }) => {
        setPasskey(value);
        setError(""); // Clear any existing error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Find the matching credential
        const matchingPass = credential.find((credent) => credent.passkey === passkey);

        if (!matchingPass) {
            setError("Invalid passkey. Please try again.");
            return;
        }

        if (matchingPass.voted) {
            setError("This passkey has already been used to vote.");
            return;
        }

        // Save the current passkey for use on the voting page
        localStorage.setItem("currentPasskey", passkey);

        // Redirect to the voting page
        window.location.href = "/vote_site.html";
    };

    return (
        <div className="w-full sm:mx-10 md:w-1/2 lg:w-1/3 border-[0.1px] sm:min-h-screen md:min-h-[50vh] rounded-lg flex relative text-blue-50 overflow-hidden flex-col justify-between items-center">
            {/* Background Image */}
            <div className="absolute h-full w-full z-0">
                <img src="/img/forest.jpg" alt="Background" className="object-cover h-full w-full" />
            </div>

            {/* Header */}
            <p className="z-10 px-5 md:px-10 special-font text-2xl font-zentry tracking-wide">
                Voter's Credential
            </p>

            {/* Login Form */}
            <div className="z-10 h-1/2 flex flex-col items-center justify-center">
                <p className="font-general text-xl mb-4">Your Gateway to Freedom!</p>

                <form className="flex flex-col gap-4 w-full px-6" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        className="form px-3 py-2 rounded-lg border"
                        type="text"
                        placeholder="Enter passkey"
                        value={passkey}
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <input
                        type="submit"
                        value="Login"
                        className="font-general w-max m-auto bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                    />
                </form>
            </div>
        </div>
    );
};

export default SiteLogin;
