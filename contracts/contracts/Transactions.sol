pragma solidity ^0.8.0;

///@title Un contrat pour des transactions basiques
///@author Ferdinand Attivi
///@notice Ce contrat reprend juste les bases fondamentaux de comment marche les transactions sur la blockchain ether
contract Transactions {
    uint256 transactionCounter;

    event TransferEvent(
        address _from,
        address _to,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct Transfer {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    Transfer[] transactions;

    /// @notice Ajoute une transaction dans la blockchain
    /// @param receiver Adresse du recepteur.
    /// @param amount montant a envoyer.
    /// @param message un message a inclure dans la transaction.
    /// @dev This function does not currently check for overflows
    function addToBlock(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCounter++;
        transactions.push(
            Transfer(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        emit TransferEvent(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions() public view returns (Transfer[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
