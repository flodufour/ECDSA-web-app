const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  //address: 
  "0x3850ba7616a9d6d7b006293b790fce16978221b5": 100,
  // public: "04397b766cbcf2d90011607e59ce061822037584590072ddb948bd99d97b766bba1982f0c9090ac80ac9d7e80fc61713eb413d95ef08e4c3b4be56c80b751a3559": 100,
  // private: "414d11a6296a492f216322b878f835b37a5e38a2d78a931cfa9a68723c24b733"
  // address: 
   "0xfd53d3d83d0a7338b7517370016431e73dd97aa3": 50,
  // public: "049f5be68e8c2ce9ba03abfbc402fc5a87dc603099c2383114b8ae73277ac02e3732565732a106a0ec1534c81705db2b73e9be28a987fad82e3792f5c8e161ff95": 50,
  // private: "ebdd3dac290bc74df3d31cb9fce0b3697c4ac2b79043d5e424cd752ee4224eff"
  // address:
  "0x2f2a9987b5473f33a67297e658c4e6fa46b36628": 75,
  // public: "0451d5975b060d7100e26ee281e0ebc768375e480a4f709b04e92c51304ba0a07e24835ca00e06e37deae695adacc74685fa426da2b7f72650d503ecaeb4294b26": 75,
  // private: "619f45c6231a7dd24bc15df1dd110d4979aae914b5210e2dc858948b6c0fe011"
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
