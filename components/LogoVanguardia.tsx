import Image from "next/image";



export default function LogoVanguardia() {
  return (
    <Image
      src={`/images/vanguardia-logo.png`}
      alt="VanguardIA"
      width={240}
      height={80}
      className="h-16 w-auto"
    />
  );
}
