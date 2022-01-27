const authorizationServices = {
  handleSetRole: async ({web3, accounts, currentUser}, AuthorizeContract) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = AuthorizeContract.networks[networkId];
    const authorizeContract = new web3.eth.Contract(
      AuthorizeContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    const roleHash = web3.utils.keccak256(process.env.REACT_APP_ROLE_PATIENT);
    const hasRole = await authorizeContract.methods
      .hasRole(roleHash, currentUser.publicAddress)
      .call({from: accounts[0]});
    console.log("has Patient role: ", hasRole);
    if (!hasRole) {
      await authorizeContract.methods
        .setPatient(currentUser.publicAddress)
        .send({from: accounts[0]});
      console.log(`User ${accounts[0]} has been set to Patient role`);
    }
    const data = await authorizeContract.getPastEvents("RoleGranted");
    console.log(data[0]["returnValues"]);
    return data[0]["returnValues"];
  },
};

module.exports = authorizationServices;
