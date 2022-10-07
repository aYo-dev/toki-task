import { AccountInfo } from "../interfaces";

const dummyAccount = {
  name: "My Amazing Bakery EOOD",
  owner: "Strahil",
  meteringPoints: [
    "1234",
    "5678"
  ]
};

export const getAccountInfo = (): AccountInfo  => {
  return dummyAccount;
}