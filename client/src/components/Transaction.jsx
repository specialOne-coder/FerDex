import React, { useContext } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';
import { Loader } from '.';
import { TransContext } from '../context/TransactionContext';

// Input component
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);


const Transaction = () => {
    const { formData, handleChange, sendTransaction , loading} = useContext(TransContext);

    const handleSend = (e) => {
        const { addressTo, amount, keyword, message } = formData;
        e.preventDefault();
        if (!addressTo || !amount || !keyword || !message) return;
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-10 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
                        Faites une transaction 
                    </h1>
                </div>

            </div>
            {/* Carte ethereum  */}
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                    <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                    <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                    <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                    <div className="h-[1px] w-full bg-gray-400 my-2" />

                    {loading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={handleSend}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send now
                            </button>
                        )}
                </div>


            </div>
        </div >
    );
};

export default Transaction;