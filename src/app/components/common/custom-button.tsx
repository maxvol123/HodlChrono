import { Button, Link } from "@heroui/react";

interface CustomButtonProps {
  href: string;
  type?: "green" | "white";
  label: string;
}

const CustomButton = ({ href, type = "white", label }: CustomButtonProps) => {
  const bgColor =
    type === "green"
      ? "bg-[#00E676] text-white border"
      : "bg-white border border-[#00E676] text-[#00E676]";

  return (
    <Link href={href}>
    <Button className={`${bgColor} rounded-xl text-lg w-[281px] h-[50px] `}>
      {label}
    </Button>
    </Link>
  );
};

export default CustomButton;
