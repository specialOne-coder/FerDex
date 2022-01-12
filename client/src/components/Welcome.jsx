import React, { useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { FaConnectdevelop } from 'react-icons/fa'
import { Loader } from '.';
import { TransContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/ShortAdress';



const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


const Welcome = () => {
    const { currentAccount, connectWallet } = useContext(TransContext);

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">

                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Envoyer des cryptos <br /> à travers le monde
                    </h1>
                    <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explorer le monde des cryptomonnaies. Achetez et vendez des cryptomonnaies facilement sur Ferdex : {currentAccount}
                    </p>
                    {!currentAccount && (
                        <button
                            type='button'
                            onClick={connectWallet}
                            className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                            <FaConnectdevelop fontSize={25} className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}
                    {/* Tableau */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
                        <div className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}>
                            Decentralized
                        </div>
                        <div className={companyCommonStyles}>Secured</div>
                        <div className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}>
                            Scalable
                        </div>
                    </div>
                </div>

            </div>
            {/* Carte ethereum  */}
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 cardEth">
                <div className="p-3  justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                    <div className="flex justify-between flex-col w-full h-full">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                            </div>
                            <BsInfoCircle fontSize={17} color="#fff" />
                        </div>
                        <div>
                            <p className="text-white font-light text-sm">
                                {shortenAddress(currentAccount)}
                            </p>
                            <p className="text-white font-semibold text-lg mt-1">
                                Ethereum
                            </p>
                        </div>
                    </div>
                </div>
                

            </div>
        </div >
    );
};

export default Welcome;