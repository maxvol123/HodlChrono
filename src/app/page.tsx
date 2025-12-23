"use client"
import Image from "next/image";
import ChipGreen from "./components/common/chip-green";
import CustomButton from "./components/common/custom-button";
import { homepage } from "./config/homepage";
import CustomCard from "./components/common/custom-card";
import HomePageElements from "./components/common/homepage-elements";

export default function Home() {
  return (
    <div className="w-full text-center pt-5 pb-24 px-3">
    <div 
    className="min-h-[700px] w-full absolute -z-10" 
    style={{
      background: 'radial-gradient(circle,rgba(0, 230, 118, 0.79) 0%, rgba(252, 70, 107, 0) 38%)',
      maxWidth: "-webkit-fill-available"
      
    }}
  ></div>
    
        <ChipGreen>{homepage.firstPart.chipgreen}</ChipGreen>
      <div className="w-full text-center pt-32"   >
        
        <div className="text-3xl">{homepage.firstPart.mainTitle}</div>
        <div className="mt-3 text-xl">{homepage.firstPart.mainDesc}</div>
      </div>
<div className="w-full max-w-[900px] mx-auto mt-44">
  <div className="flex justify-around items-center w-full flex-wrap gap-3">
    <CustomButton href={homepage.firstPart.buttons.button1.link} type="white" label={homepage.firstPart.buttons.button1.label} />
    <CustomButton href={homepage.firstPart.buttons.button2.link} type="green" label={homepage.firstPart.buttons.button2.label} />
  </div>
</div>
      <div className="w-full text-center pt-32"   >
        
        <div className="text-[19px]">{homepage.firstPart.dataTitle}</div>
        <div className="mt-3 text-[19px]">{homepage.firstPart.dataSubTitle}</div>
      </div>
     <div className="w-full max-w-[1000px] mx-auto mt-10">
      <div className="flex justify-around items-center w-full flex-wrap gap-5">
        <Image src={homepage.firstPart.logo1} alt="Bybit" width={200} height={60}/>
        <Image src={homepage.firstPart.logo2} alt="CK" width={200} height={60}/>
        <Image src={homepage.firstPart.logo3} alt="OKX" width={200} height={60}/>
</div> 
      </div>
            <div className="w-full text-center pt-32">
        
        <div className="text-3xl">{homepage.secondPart.mainTitle}</div>
        <div className="w-full max-w-[1300px] mx-auto mt-10">
        <div className="flex flex-row justify-around flex-wrap gap-5">
          <CustomCard title={homepage.secondPart.cards.card1.title} desc={homepage.secondPart.cards.card1.desc} label={homepage.secondPart.cards.card1.button.label} link={homepage.secondPart.cards.card1.button.link}/>
          <CustomCard title={homepage.secondPart.cards.card2.title} desc={homepage.secondPart.cards.card2.desc} label={homepage.secondPart.cards.card2.button.label} link={homepage.secondPart.cards.card2.button.link}/>
          <CustomCard title={homepage.secondPart.cards.card3.title} desc={homepage.secondPart.cards.card3.desc} label={homepage.secondPart.cards.card3.button.label} link={homepage.secondPart.cards.card3.button.link}/>
        </div>
        </div>
      </div>
      
      <div className="w-full text-center pt-32">
        
        <div className="text-3xl">{homepage.thirdPart.mainTitle}</div>
        <div className="flex flex-wrap justify-around mt-10 max-lg:gap-7">
            <HomePageElements title={homepage.thirdPart.elements.el1.title} desc={homepage.thirdPart.elements.el1.desc} size={1} marginBottom={true}/>
            <HomePageElements title={homepage.thirdPart.elements.el2.title} desc={homepage.thirdPart.elements.el2.desc} size={3}/>
            <ChipGreen>{homepage.thirdPart.elements.chipgreen.title}</ChipGreen>
            <HomePageElements title={homepage.thirdPart.elements.el3.title} desc={homepage.thirdPart.elements.el3.desc} size={3}/>

        </div>
      </div>


    </div>
  );
}
