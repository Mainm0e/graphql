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

     return { ...transaction, dayFrom: { fday, year, time } };
  });
  return updatedTransactionData;
}

export function convertDataToSkillData(transactionData) {
    const obj = {}
   
   
 transactionData["transaction"].forEach(element => {
  const result = element.type.replace(/^skill_/, "");
  if (obj[result] === undefined || obj[result] === null || obj[result] < element.amount) {
  obj[result] = element.amount
  };
});
 let mapArray = [[],[],[]]
 for (const [key, value] of Object.entries(obj)) {
  const result = key.replace(/_/g, " ");
  if (value > 0) {
    mapArray[0].push(result)
    mapArray[1].push(value)
    mapArray[2].push(getRandomColor())
  }
}
return mapArray
}

export function findInfo(data){
  const obj = []
  data["user"].forEach(element => {
    const date = new Date(element["attrs"]["dateOfBirth"]);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit"
    };

const formattedDate = date.toLocaleDateString("en-US", options)
  let payload = {
    "email":element["attrs"]["email"],
    "img":element["attrs"]["image"],
    "firstname":element["attrs"]["firstName"],
    "surname":element["attrs"]["lastName"],
    "dateOfBirth":formattedDate,
    "auditRatio":element["auditRatio"].toFixed(1),
  }
  obj.push(payload)
})
  return obj
}

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random red component (0-255)
  const g = Math.floor(Math.random() * 256); // Random green component (0-255)
  const b = Math.floor(Math.random() * 256); // Random blue component (0-255)
  const alpha = Math.random(); // Random alpha value (0-1)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Return the RGBA color string
}