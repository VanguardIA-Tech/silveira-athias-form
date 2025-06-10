import Image from "next/image";



export default function LogoSilveira() {
  return (
    <Image
      src={`/images/logo.png`}
      alt="Silveira Athias"
      width={900}
      height={270}
      className="h-36 md:h-42 w-auto"
      priority
    />
  );
}
