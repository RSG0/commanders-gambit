import { FaArrowLeft } from "react-icons/fa";

export default function NextButton({handleNext, ...props})
{
    return(
    <button className="button" onClick={() => handleNext()} {...props}
>
        <p className="font-black">Next</p>
    </button>)    
}       