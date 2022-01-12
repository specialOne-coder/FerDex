import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
    console.log({
        provider,
        signer, transactionContract
    });
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addresTo: '', amount: '', keyword: '', message: '' });
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const [loading, setLoading] = useState(false);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [transactions, setTransactions] = useState([]);

    // tester si l'utilisateur a web3 ou pas
    const isConnected = async () => {
        try {
            if (!ethereum) return alert("Svp veuillez installer metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            throw console.log("Sev error : ", error);
        }

    }

    //get Transactions
    const getTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();
                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Faire une transaction
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Svp veuillez installer metamask");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //Gwei to decimal
                    value: parsedAmount._hex,
                }]
            })
            const transactionHash = await transactionContract.addToBlock(addressTo, parsedAmount, message, keyword);
            setLoading(true);
            console.log('Loading : ', transactionHash.hash);
            await transactionHash.wait();
            setLoading(false);
            console.log("Success - ", transactionHash.hash);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionsCount(transactionCount.toNumber());
        } catch (error) {
            throw console.log('Error throw : ', error);
        }
    }

    //si des transactions existes
    const IfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
                console.log(currentTransactionCount);
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    // se connecter a son wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Svp veuillez installer metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        isConnected();
        IfTransactionsExists();
    }, [transactionsCount]);

    return (
        <TransContext.Provider value={{ currentAccount, connectWallet, formData, handleChange, sendTransaction, transactions , loading }}>
            {children}
        </TransContext.Provider>
    );
}
