import React, {useState} from 'react'
const credential = JSON.parse(localStorage.getItem('credential'))


const SiteLogin = () => {
    
    const [passkey, setPasskey] = useState('')
  

   



    const handleChange = ({target:{name, value}})=>{

        setPasskey(value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        // Find the matching credential
        const matchingPass = credential.find((credent) => credent.passkey === passkey);

        if (!matchingPass) {
            alert("Passkey not found");
            return;
        }

        if (matchingPass.voted) {
            alert("User already voted");
            return;
        }

        // Allow the user to vote and mark as voted
        alert("Congrats, you can vote!");
        matchingPass.voted = true; // Update the voted status

        // Update credentials in localStorage or state if needed
        localStorage.setItem("credential", JSON.stringify(credential));

        // Redirect to the voting page
        window.location.href = 'https://admin-steel-iota.vercel.app/voter.html';
    };



    return (
        <div className=" w-full sm:mx-10 md:w-1/2 lg:w-1/3 border-[0.1px] sm:min-h-screen md:min-h-[50vh] rounded-lg flex relative text-blue-50  overflow-hidden flex-col justify-between items-center">

            <div className="absolute scale-1 h-[100%] w-[100%] z-0 ">
                <img
                    src="/img/forest.jpg"
                    className="object-cover"
                />
            </div>
            <p className="z-10 px-5 md:px-10 special-font text-2xl font-zentry tracking-wide">Voter's credential</p>

            <div className="z-10 h-1/2 flex flex-col items-center justify-center">
                <p className="font-general text-xl">Your Gateway to Freedom!</p>

                <form className="flex flex-col gap-2 w-full mt-4 py-5" onSubmit={handleSubmit}>

                    <input
                        onChange={handleChange}
                        className="form"
                        type="text"
                        placeholder="Enter passkey"
                        name="name"
                        value={passkey}
                        required

                    />
                    
                    
                    <input type="submit" className="font-general w-max m-auto border px-2 rounded-lg"/>
                </form>
            </div>


        </div>


    )
}
export default SiteLogin
