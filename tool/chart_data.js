import { getData } from "./getApi.js";
import {
    objectById
} from "../payload.js";
export function chartData(transactionData) {
    let obj = []
    transactionData["transaction"].forEach(async(transaction) => {
      obj.push({
        day: transaction["createdAt"]["fday"],
        amount: transaction["amount"],
        name: await getObjectName(transaction["objectId"]),
      });
    
    });
   return obj;
  }
  async function getObjectName(objectId) {
    return new Promise((resolve, reject) => {
      getData(objectById(objectId), localStorage.getItem("jwt"))
        .then((data) => {
          const objectName = data["object"][0]["name"];
          resolve(JSON.stringify(objectName));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  