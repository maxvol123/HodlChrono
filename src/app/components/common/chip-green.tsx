"use client";

interface ChipGreenProps {
  children: string;
}

const ChipGreen = ({ children }: ChipGreenProps) => {
  return (
    <div
      className="inline-flex items-center rounded-xl bg-[#00E676]/50 text-white text-m py-3 px-10"
    >
      {children}
    </div>
  );
};

export default ChipGreen;
