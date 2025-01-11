import React, {useState} from 'react'
import {credentials} from "./usages/credentials.js";


const WalletReg = () => {
    const [hasCopied, setHasCopied] = useState(false)
    const [passkey, setPasskey] = useState('')
    const [form, setForm]  = useState({
        name: '',
        NIN:'',
        passkey: '',
        voted: false
    })

    const handleCopy = ()=>{
        setHasCopied(true)
        navigator.clipboard.writeText(form.passkey)

        setTimeout(()=>{
            setHasCopied(false)
        }, 2000)
    }
    const [isKeyVisible, setIsKeyVisible] = useState(false)


    
    const handleChange = ({target:{name, value}})=>{
        
        setForm({...form, [name]: [value]})
    }
    const redirectToLogin = ()=>{
        window.location.href= '/login.html'

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        credentials.push(form)
        localStorage.setItem('credential', JSON.stringify(credentials))
        alert('submited')
        redirectToLogin()
        
    }
    
    const generatePasskey = (e)=>{
        e.preventDefault()
        setIsKeyVisible(true)
        const randomLetters = 'alljsfjrshljjeyihijishUSR'
        const RandomNumber = Math.random()

        const passkey = `${randomLetters}${RandomNumber}`

        setForm({...form, passkey: passkey})
    }
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
                        placeholder="Enter FullName"
                        name="name"
                        value={form.name}
                        required
                           
                    />
                    <input
                        onChange={handleChange}
                        className="form"
                        type="number"
                        placeholder="Enter NIN"
                        name="NIN"
                        value={form.NIN}
                        required
                           
                    />
                    
                    <button 
                        className="font-general m-0 py-0 px-5 border w-max mx-auto rounded-xl"
                        onClick={generatePasskey}
                    >
                        Generate Passkey
                    </button>
                    <div className="flex flex-row ">
                        <p className={isKeyVisible ? 'visible' : 'invisible'}>{form.passkey} <span onClick={handleCopy} classname="cursor-pointer">{hasCopied ? 'copied' : 'copy'}</span> </p>
                    </div>
                    <input type="submit" className="font-general w-max m-auto border px-2 rounded-lg"/>
                    <p className="w-max mx-auto">Already Reigistered? </p>
                    <button onClick={redirectToLogin}>login</button>
                </form>
            </div>

            
        </div>

        
    )
}
export default WalletReg
