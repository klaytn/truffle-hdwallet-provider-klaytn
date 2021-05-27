# truffle-hdwallet-provider-klaytn
Forked truffle-hdwallet-provider@1.2.1 and applied patches for Klaytn network.
It's primary usage is deploying contracts and interacting with them in Klaytn network when using Truffle framework.

## Install

```
$ npm install truffle-hdwallet-provider-klaytn
```

## Requirements
```
Node v12.20 or later
Caver-js v1.5.5 or later
```

## General Usage

You can use this provider wherever a Web3 provider is needed, not just in Truffle. For Truffle-specific usage, see next section.

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const Web3 = require("web3");
const mnemonic = "mountains supernatural bird..."; // 12 word mnemonic
let provider = new HDWalletProvider(mnemonic, "http://localhost:8551");

// Or, alternatively pass in a zero-based address index.
provider = new HDWalletProvider(mnemonic, "http://localhost:8551", 5);

// Or, use your own hierarchical derivation path
provider = new HDWalletProvider(mnemonic, "http://localhost:8551", 5, 1, true, "m/44'/137'/0'/0/");


// HDWalletProvider is compatible with Caver.
const caver = new Caver(provider);

// ...
// Write your code here.
// ...

// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
provider.engine.stop();
```

By default, the `HDWalletProvider` will use the address of the first address that's generated from the mnemonic. If you pass in a specific index, it'll use that address instead.

Parameters:

| Parameter | Type | Default | Required | Description |
| ------ | ---- | ------- | ----------- | ----------- |
| `mnemonic` | *`string*` | null | [x] | 12 word mnemonic which addresses are created from. |
| `provider` | `string\|object` | `null` | [x] | URI or Ethereum client to send all other non-transaction-related Web3 requests |
| `address_index` | `number` | `0` | [ ] | If specified, will tell the provider to manage the address at the index specified |
| `num_addresses` | `number` | `1` | [ ] | If specified, will create `number` addresses when instantiated |
| `shareNonce` | `boolean` | `true` | [ ] | If false, a new WalletProvider will track its own nonce-state |
| `wallet_hdpath` | `string` | `"m/44'/60'/0'/0/"` | [ ] | If specified, will tell the wallet engine what derivation path should use to derive addresses. |


### Private Keys

Instead of a mnemonic, you can alternatively provide a private key or array of private keys as the first parameter. When providing an array, `address_index` and `num_addresses` are fully supported.

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
//load single private key as string
let provider = new HDWalletProvider("3f841bf589fdf83a521e55d51afddc34fa65351161eead24f064855fc29c9580", "http://localhost:8551");

// Or, pass an array of private keys, and optionally use a certain subset of addresses
const privateKeys = [
  "3f841bf589fdf83a521e55d51afddc34fa65351161eead24f064855fc29c9580",
  "9549f39decea7b7504e15572b2c6a72766df0281cea22bd1a3bc87166b1ca290",
];
provider = new HDWalletProvider(privateKeys, "http://localhost:8551", 0, 2); //start at address_index 0 and load both addresses
```
**NOTE: This is just an example. NEVER hard code production/mainnet private keys in your code or commit them to git. They should always be loaded from environment variables or a secure secret management system.**

## Truffle Usage

You can easily use this within a Truffle configuration. For instance:

truffle-config.js
```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*" // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(fs.readFileSync(path.resolve(__dirname)+'/privateKeys.js'))

        return new HDWalletProvider(pks, "http://localhost:8551", 0, pks.length)
      },
      network_id: '203', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '1001' }
          ],
          keepAlive: false,
        }
        return new HDWalletProvider(privateKey, new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'25000000000'
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '8217' }
          ],
          keepAlive: false,
        }
        return new HDWalletProvider(cypressPrivateKey, new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
      },
      network_id: '8217', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'25000000000'
    },
    baobab: {
      provider: () => { return new HDWalletProvider(privateKey, "http://your.baobab.en:8551") },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    cypress: {
      provider: () => { return new HDWalletProvider(privateKey, "http://your.cypress.en:8551") },
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  }
};
```
