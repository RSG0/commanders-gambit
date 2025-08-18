import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomeButton()
{
    const navigate = useNavigate();

  const handleNavigate = () => // should navigate to search page
  {
    navigate("/home");
  }

    return(
    <button className="button"
    onClick={() => handleNavigate()}>
            <FaHome className="text-2xl" title="Home" />
            <p className="font-black ml-1.5">Home Button</p>
        </button>)
        
}       