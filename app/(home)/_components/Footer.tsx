import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full  border-t shadow-md bg-[#212227] px-6 md:px-28 flex items-center">
      <div className="md:max-w-screen-2xl w-full flex items-center justify-between space-y-6 flex-wrap py-20 mx-auto">
        <div>
          <Logo color={"white"} />
          <p className="text-[#AFAFAF] text-sm mt-2 w-72 ">
            Saas dashboard that enable users to perform various tasks and
            activities related to their business
          </p>
          <div className="flex space-x-5 items-center mt-6">
            <Facebook color="#fff" />
            <Instagram color="#fff" />
            <Linkedin color="#fff" />
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl">Quick links</h2>
          <ul className="text-[#AFAFAF] text-sm mt-2 flex flex-col space-y-3 mt-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Features</Link>
            </li>
            <li>
              <Link href="/">Pricing</Link>
            </li>
            <li>
              <Link href="/">Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-2xl">NewsLatter</h2>
          <p className="text-[#AFAFAF] text-sm mt-2 w-72 ">
            Enter your email to get discounts and offers
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
            <Input type="email" placeholder="Email" />
            <Button className="bg-[#AA7AEB]" type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
