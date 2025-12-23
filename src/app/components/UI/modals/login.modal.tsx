"use client"

import CustomModal from "../../common/modal";
import LoginForm from "@/app/forms/login.form";
interface IProps {
    isOpen: boolean;
    onClose: () => void;
    isRegistrationOpen: boolean;
    setRegistrationOpen: (value: boolean) => void;
  }

const LoginModal = ({isOpen, onClose, isRegistrationOpen, setRegistrationOpen}:IProps ) => {
    
    return(
        <CustomModal isOpen={isOpen} onClose={onClose} title="Login">
            <LoginForm isRegistrationOpen={isRegistrationOpen} setRegistrationOpen={setRegistrationOpen} onClose={onClose}/>
        </CustomModal>
    )
}
 
export default LoginModal;