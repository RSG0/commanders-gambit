import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [commanderImage1, setCommanderImage1] = useState();

  async function GetMagicCommander()

  {
    try{
      const response = await fetch("https://api.magicthegathering.io/v1/cards")
      if (!response.ok)
      {
        throw new Error("Can not fetch resource");
      }
      const data = await response.json()
      if (data == null)
      {
        throw new Error("Can not translate resource to JSON");
      }
      console.log(data.cards[0].name)
      const commanderImage = data.cards[0].imageUrl
      console.log("Image:", commanderImage)
      const imgElement = document.getElementById('cmdImg1')
      imgElement.src = commanderImage
      imgElement.style.display = 'block'
      imgElement.className = 'bg-transparent w-20 h-auto'
    }
    catch(er)
    {
      console.log("Error:",er);
    }
  }

  return (
    <>
      <p className="font-bold text-center justify-center items-center">Commander's Gambit</p>
    <div className="flex justify-center items-center bg-amber-200">
      <img className="bg-red-500 w-40 h-auto" src='' alt='Cmd1' id='cmdImg1' style={{display: 'none'}}></img>
      <div className="bg-green-500 w-2 h-2 mx-1"></div>
      <div className="bg-blue-500 w-2 h-2"></div>
    </div>
    <button onClick={() =>GetMagicCommander()}></button>
    </>
  )
}

