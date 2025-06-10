import Image from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function LogoVanguardia() {
  return (
    <Image
      src={`${BASE_PATH}/images/vanguardia-logo.png`}
      alt="VanguardIA"
      width={240}
      height={80}
      className="h-16 w-auto"
    />
  );
}
