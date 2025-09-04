import { SocialIcon } from "react-social-icons";

export default function Footer () {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-2 mt-20 m-6 ">
        <SocialIcon url="https://instagram.com" style={{height:35 , width:35}} />
        <SocialIcon url="https://youtube.com" style={{height:35 , width:35}}/>
        <SocialIcon url="https://x.com" style={{height:35 , width:35}}/>
        <SocialIcon url="https://facebook.com" style={{height:35 , width:35}}/>
        <SocialIcon url="https://www.threads.com" style={{height:35 , width:35}}/>
        <SocialIcon url="https://www.tiktok.com/" style={{height:35 , width:35}}/>
        <SocialIcon url="https://www.whatsapp.com/" style={{height:35 , width:35}}/>
      </div>

      <h1 className="border-t-1 text-xs">

        © 2020 All Rights Reserved. Design by @LaCroixStyles
      </h1>
    </div>
  );
};
