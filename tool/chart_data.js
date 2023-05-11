import { getData } from "./getApi.js";
import {
    objectById
} from "../payload.js";
export  function chartData(transactionData) {
    let obj = {}
    obj["data"] = new Array
    let data = {}
    transactionData["transaction"].forEach((transaction) => {
       let day = transaction["dayFrom"]["fday"]
      let amount = transaction["amount"]
       let  objId = transaction["objectId"]
        data = {
          "createdAt": transaction["createdAt"],
          "amount": amount,
          "objId": objId, 
          "day": day,
        }
        //add data to obj
       obj["data"].push(data)
      }) 
      obj["data"].forEach(async(data) => {
        data["objId"] = await getObjectName(data["objId"])
      })
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
  