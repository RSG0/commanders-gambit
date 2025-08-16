import { FaHome } from "react-icons/fa";

export default function HomeButton()
{
    return(
<button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            <FaHome className="text-4xl gap-4" title="Home" />
            <p className="font-black">Home Button</p>
        </button>)
        
}       