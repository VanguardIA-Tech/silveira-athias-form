import Image from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function LogoSilveira() {
  return (
    <Image
      src={`${BASE_PATH}/images/logo.png`}
      alt="Silveira Athias"
      width={900}
      height={270}
      className="h-36 md:h-42 w-auto"
      priority
    />
  );
}
