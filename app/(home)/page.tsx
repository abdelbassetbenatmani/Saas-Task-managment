import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import curve from "../../public/curve.png";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className=" flex flex-col justify-center items-center ">
      <Badge variant="secondary" className="bg-[#d3d3d3] px-2 py-1 h">
        7 Day Free Trial - No Credit card required
      </Badge>
      <h1 className="scroll-m-20 text-4xl lg:text-8xl font-extrabold tracking-tight text-center my-6 lg:mt-9 lg:mb-14 relative">
        Unlock the <br /> <span className="text-sky-300">Power</span> of Taskona
        <Image className="absolute -bottom-6 -right-4 w-[160px] lg:w-[380px] h-[30px]" src={curve} fill={false} alt="curve"/>
      </h1>
      <p className="text-center font-semibold text-lg lg:text-3xl px-4 lg:px-0 max-w-xl mb-14">
        Turn your tasks into Actionable Insights with Our SaaS Dashboard
      </p>
      <Button size="lg" className=" rounded-full mb-5 text-[22px]">
        Get Started <ArrowRight />
      </Button>
    </div>
  );
};

export default HomePage;
