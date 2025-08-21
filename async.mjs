// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.mjs";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  //console.log(id)

  //Awlays the first thing to do = Try/Catch
  try {
    if (isNaN(id) || id == undefined || id < 1 || id > 10) throw new Error(`Incorrect ID Input`)

    //everytime we go to a db, awlays use await
    const centralReturn = await central(id);
    console.log(centralReturn)

    let basicInfo;
    try {
      basicInfo = await dbs[centralReturn](id);
    } catch (err) {
      throw new Error(`Database ${centralReturn} failed`);
    }

    const secureInfo = await vault(id);
    console.log(secureInfo)

    return {
      id,
      ...basicInfo,
      ...secureInfo
    };

  } catch (err) {
    throw err;
  }
}

getUserData(1)
  .then(res => console.log(res))
  .catch(err => console.error(`❌ Error - ${err.message}`));

// Expected output
// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }