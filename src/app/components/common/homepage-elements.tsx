interface HomePageElementsProps {
    title: string, 
    desc: string,
    size: 1 | 3,
    marginBottom?: boolean
}

const HomePageElements = ({title, desc, size=1, marginBottom=false}: HomePageElementsProps) => {
    let elementWidth = "w-full"
    let mb = ""
    if (size===1) {
        elementWidth = "w-full"        
    }
        if (size===3) {
        elementWidth = "w-[30%] max-lg:w-full"
    }
    if (marginBottom) {
        mb="mb-10 max-lg:mb-0"
    }
    return ( 
        <div className={`${elementWidth} ${mb}`}>
        <div className="text-[19px]">{title}</div>
        <div className="">{desc}</div>
        </div>
     );
}
 
export default HomePageElements;