"use client"

import { addReview } from "@/actions/admin-actions";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { getToken } from "next-auth/jwt";
import { useState } from "react";

const Admin = () => {
  const [date, setDate] = useState<string>("01/01/2025");
  const [title, setTitle] = useState<string>("Weekly review BTC");
  const [imageUrl, setImageUrl] = useState<string>("261025.png");
  const [prediction, setPrediction] = useState<string>("Long/Short");
  const [author, setAuthor] = useState<string>("HodlChronoMain");
  
  const Create = async () =>{
    try {
    addReview(date, title, imageUrl, prediction, author)      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="">
      <h1 className="text-center text-2xl my-5">Add new Review</h1>
    <div className="flex flex-col gap-5">

     <Input
        isRequired
        className="max-w-xs"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        label="Date"
        type="text"
      />
      
      <Input
        isRequired
        className="max-w-xs"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        type="text"
      />
      
      <Input
        isRequired
        className="max-w-xs"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        label="Image URL"
        type="text"
      />
      
      <Input
        isRequired
        className="max-w-xs"
        value={prediction}
        onChange={(e) => setPrediction(e.target.value)}
        label="Prediction"
        type="text"
      />
      
      <Input
        isRequired
        className="max-w-xs"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        label="Author"
        type="text"
      />
       <Button 
       onClick={()=>Create()}
       className={`bg-[#00E676] text-white border rounded-xl text-lg w-[281px] h-[50px] `}>
      Create
    </Button>
    </div>
    </div>
  )
}
export default Admin;
