import { sen } from "@/lib/font/Sen";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import VersionNumber from "./VersionNumber";


const Footer = () => {
  return (
    <footer className={`bg-calpolygreen-980 py-4 relative text-beige-100 ${sen.className}`}>
      <div className="container mx-auto text-center relative">
        <div className="flex justify-end gap-2"> {/* Posicionamento dos ícones no canto superior direito */}
          <Link href="https://www.facebook.com/sedaminforma" target="_blank" rel="noopener noreferrer" className=" hover:font-bold ">
            <div className="max-sm:hidden border border-calpolygreen-700 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gradient-to-t hover:from-blue-900 hover:border-blue-700 hover:to-blue-600">
              <FaFacebookF />
            </div>
          </Link>
          <Link href="https://www.instagram.com/sedaminforma" target="_blank" rel="noopener noreferrer">
            <div className="max-sm:hidden border border-calpolygreen-700 rounded-full p-2 transition duration-300 ease-in-out  hover:bg-gradient-to-t hover:from-pink-500 hover:border-orange-900 hover:border hover:to-purple-700">
              <FaInstagram className=" hover:font-bold " />
            </div>
          </Link>
        </div>
        <Image
          src={encodeURI("/ext-files/website-icons/brasao-rondonia.png")}
          width={64}
          height={85}
          alt="Brasão"
          className="mx-auto mb-4"
        />
        <p className="text-sm">
          <b>Palácio Rio Madeira</b>
        </p>
        <p className="text-sm">
          Av. Farquar, 2986 - Pedrinhas | 76.801-470 - Porto Velho, RO
        </p>
      </div>
      <div className="container mx-auto">
        <p className="text-center text-sm font-bold">
          Governo do Estado de Rondônia
        </p>
        <p className="text-center text-sm">
          &copy; Todos os Direitos Reservados - 2024
        </p>
        <p className="text-center text-sm">

        </p>
        <p className="text-center text-sm">
          Desenvolvido pela <Link href="/cti" target='_blank' className='link link-hover'>CTI-SEDAM</Link>
        </p>
        {/* <p className="text-center text-sm">&copy; 2024</p> */}
        <br />
        <div className="flex sm:justify-between w-full items-center">
          <div className='flex gap-4 '>
            <div className="sm:hidden border  border-calpolygreen-700 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gradient-to-t hover:from-calpolygreen-980  hover:to-calpolygreen-950">
              <Link href="https://www.facebook.com/sedaminforma" target="_blank" rel="noopener noreferrer" className=" hover:font-bold ">
                <FaFacebookF />
              </Link>
            </div>
            <div className="sm:hidden border border-calpolygreen-700 rounded-full p-2 transition duration-300 ease-in-out  hover:bg-gradient-to-t hover:from-calpolygreen-980  hover:to-calpolygreen-950">
              <Link href="https://www.instagram.com/sedaminforma" target="_blank" rel="noopener noreferrer">
                <FaInstagram className=" hover:font-bold " />
              </Link>
            </div>
          </div>
          <div className=" ml-auto text-end text-sm">
            <Suspense fallback={<b>Carregando...</b>}>
              <VersionNumber />
            </Suspense>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
