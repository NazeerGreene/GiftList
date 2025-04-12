const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // TODO: prove that a name is in the list
  // 1. take the name, proof, and root from the merkletree and invoke verifyProof

  const { proof, name } = req.body;
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  console.log(`Name: ${name}`);
  if (isInTheList) {
    console.log(`\tAccepted`);
    res.send("You got a toy robot!");
  } else {
    console.log(`\tRejected`);
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
