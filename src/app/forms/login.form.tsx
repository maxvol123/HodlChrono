"use client"

import { signInWithCred } from "@/actions/sign-in";
import { Button, Chip, Form, Input } from "@heroui/react";
import { Link } from "@heroui/react";

import React, { useState } from "react";

interface IProps {
    onClose: () => void;
    isRegistrationOpen: boolean;
    setRegistrationOpen: (value: boolean) => void;
}

const LoginForm = ({onClose, setRegistrationOpen}: IProps) => {

      const [isCredentialCorrect, setCredentialCorrect] = useState(false)
  
  const [formData, setFormData] = useState({
    email:'',
    password:''
})
  const onSubmit = async (e: React.FormEvent) => {
    try {
      setCredentialCorrect(false)
      e.preventDefault()
      await signInWithCred(formData.email, formData.password)
      window.location.reload()    
      onClose()
    } catch (error) {
      setCredentialCorrect(true)
    }
   
    
    
  };

  return (
    <Form onSubmit={onSubmit}>
      {isCredentialCorrect&&<Chip className="m-auto bg-red-500/50" color="danger">Incorrect Email or Password</Chip>}
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        onChange={(e)=>{setFormData({ ...formData, email:e.target.value})}}
      />
      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="Password"
        placeholder="Enter your Password"
        type="password"
        value={formData.password}
        onChange={(e)=>{setFormData({ ...formData, password:e.target.value})}}
      />
      <div className="flex flex-row justify-between w-full">
      <Button type="submit" className="bg-[#00E676] text-white mt-3">Login</Button>
      <Link className="text-inherit" href="#" onPress={()=>{setRegistrationOpen(true); onClose()}}>
          Sign Up
          </Link>

      </div>
    </Form>
  );
}
 
export default LoginForm;