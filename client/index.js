const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  //
  // 1. grab the proof from the MerkleTree
  // 2. send the proof and the leaf (exact name on the list)

  const name = niceList[Math.round(Math.random() * niceList.length)];
  const index = niceList.findIndex((n) => n === name);

  // make the MerkleTree
  const merkletree = new MerkleTree(niceList);
  const proof = merkletree.getProof(index);

  // debug output
  console.log(`name from the nice list: ${name}`);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
