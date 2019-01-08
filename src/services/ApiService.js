const memoJson = require('contracts/MemoPad.json');
const CONTRACT_ADDR = 'TKpJwiWBKDjcVM1XnZRBNdwhk1MVDKxdoc';

const ApiService = {
    tronWeb: false,
    memoContract: null,
    setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.memoContract = tronWeb.contract(memoJson.abi, CONTRACT_ADDR);
    },
    async readMemo () {
      try {
        const memo = {};
        memo.title = await this.memoContract.title().call();
        memo.memo = await this.memoContract.memo().call();
        memo.author = await this.memoContract.author().call();
        console.log(memo);
        return memo;
      } catch (error) {
          console.log(error)
          throw(error);
      }
    },
    async postMemo (title, memo) {
      try {
        await this.memoContract.Post(title, memo).send({
            shouldPollResponse: false
        });
      } catch (error) {
          console.log(error)
          throw(error);
      };
    }
}

export default ApiService;
