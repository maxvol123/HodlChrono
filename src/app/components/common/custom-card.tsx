import { Card, CardBody } from "@heroui/react";
import CustomButton from "./custom-button";

interface CustomCardProps {
    title: string,
    desc: string,
    label: string,
    link: string
}
const CustomCard = ({title, desc, label, link}: CustomCardProps) => {
    return (  
        <Card>
      <CardBody className="bg-[#5BEAA5] max-w-[353px] flex text-center">
        <div className="text-[19px] mb-5">{title}</div>
        <div className="mb-10 px-5">{desc}</div>
        <div className="justify-end mt-auto">
        <CustomButton href={link} label={label} type="white"/>
        </div>
      </CardBody>
    </Card>
    );
}
 
export default CustomCard;