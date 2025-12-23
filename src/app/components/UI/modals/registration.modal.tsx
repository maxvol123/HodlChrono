"use client"

import RegistrationForm from "@/app/forms/registration.form";
import CustomModal from "../../common/modal";
interface IProps {
    isOpen: boolean,
    onClose: ()=> void,
    setLoginOpen: (value: boolean) => void
}
const RegistrationModal = ({isOpen, onClose, setLoginOpen}:IProps) => {
    return(
        <CustomModal isOpen={isOpen} onClose={onClose} title="Sign Up">
            <RegistrationForm setLoginOpen={setLoginOpen} onClose={onClose}/>
        </CustomModal>
    )
}
 
export default RegistrationModal;