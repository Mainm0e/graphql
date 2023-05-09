export function convertCreatedAtToNewFormat(transactionData) {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const updatedTransactionData = transactionData.map((transaction) => {
    const createdAt = new Date(transaction.createdAt);

    const day = createdAt.getDate();
    const month = monthNames[createdAt.getMonth()];
    const fday = `${month} ${day}`;
    const year = createdAt.getFullYear();
    const time = createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

     return { ...transaction, createdAt: { fday, year, time } };
  });
  return updatedTransactionData;
}

  