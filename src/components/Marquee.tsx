import React from "react";
import AstraLogo from "../../public/Assets/Svg/AstraLogo.svg";
import FlensLogo from "../../public/Assets/Svg/LogoFlens.svg";
import LogoNeu from "../../public/Assets/Svg/faviconLogoNeu.svg"; 
import Image from "next/image";
import Marquee from "react-fast-marquee";

const App = () => (
  <Marquee>
    <div className="flex items-center gap-40">

    
  
    <Image
    src={LogoNeu}
    alt="LogoNeu"
    width={144}
    height={32}
    /> 
    <Image
    src={AstraLogo}
    alt="LogoNeu"
    width={144}
    height={32}
    /> 
    <Image
    src={FlensLogo}
    alt="LogoNeu"
    width={144}
    height={32}
    
    /> 
     <Image
    src={LogoNeu}
    alt="LogoNeu"
    width={144}
    height={32}
    /> 
    <Image
    src={AstraLogo}
    alt="LogoNeu"
    width={144}
    height={32}
    /> 
    <Image
    src={FlensLogo}
    alt="LogoNeu"
    width={144}
    height={32}
    
    /> 
   
    </div>
  </Marquee>
);

export default App;
