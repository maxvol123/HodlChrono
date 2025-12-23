"use client"

import { registerUser } from "@/actions/register";
import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";

interface IProps {
    onClose: () => void
    setLoginOpen: (value: boolean) => void
}

const RegistrationForm = ({onClose, setLoginOpen}: IProps) => {
    const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    const result = await registerUser(formData)
    

    onClose()
  };
const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
})
  return (
    <Form onSubmit={onSubmit}>
          <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="Name"
        labelPlacement="outside"
        name="Name"
        placeholder="Enter your name"
        type="text"
        value={formData.name}
        onChange={(e)=>{setFormData({ ...formData, name:e.target.value})}}
      />
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
      <Input
        isRequired
        label="Confirm Password"
        labelPlacement="outside"
        name="Confirm Password"
        placeholder="Enter your Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e)=>{setFormData({ ...formData, confirmPassword:e.target.value})}}
        validate={(value) => {
            if (value !== formData.password) {
                return 'Passwords must be equal';
            }
            return null
          }}
      />
      <div className="flex flex-row justify-between w-full">
        <Button type="submit" className="bg-[#00E676] text-white mt-3">SignUp</Button>
        <Link className="text-inherit" href="#" onPress={()=>{setLoginOpen(true); onClose()}}>
          Login
          </Link>
      </div>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
 
export default RegistrationForm;