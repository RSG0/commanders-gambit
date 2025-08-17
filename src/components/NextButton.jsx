import { FaArrowLeft } from "react-icons/fa";

export default function NextButton({handleNext})
{
    return(
    <button className="button" onClick={() => handleNext()}>
        <p className="font-black">Next</p>
    </button>)    
}       