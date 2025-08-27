import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackButton({back})
{
    const backLocation = back || -1; // default to -1 to go back in history if no path provided
    const navigate = useNavigate();

  const handleNavigate = () => 
  {
    navigate(backLocation);
  }
  useEffect(() => {
    // console.log("Back Button Path:", back);
  }, [back]);

    return(
    <button className="button" onClick={() => handleNavigate()}>
            <FaArrowLeft className="text-2xl" title="Back" />
            <p className="font-black ml-2">Back</p>
        </button>)
        
}       