import logo from './logo.svg';
import './App.css';
import contractABI from './abi.json';

const { ethers } = require('ethers');

function App() {

  const contractAddress = "0x92Fe47D13B645b73F4B24A14C8ff61aeAEAb6ED4";


  //this is to interract with the metamask
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  //this functions interract with the smart contract
  async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      //this creates a proovider for you
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      //this is all you need to create an instance of your contract and then go on to use the functions
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const transaction = await contract.withdraw();
        await transaction.wait();
        console.log('Money withdrawn');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={withdraw}>Withdraw</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
