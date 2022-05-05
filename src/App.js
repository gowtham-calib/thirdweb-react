import { useAddress, useMetamask, useMarketplace } from "@thirdweb-dev/react";
import { useState } from "react";

import "./App.css";

function App() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const marketplaceModule = useMarketplace("0xFdE9cc4B2289D4cF53C65256562171B1cF89B562");

  const [list, getList] = useState([])

  async function getData() {
    let result = await marketplaceModule.getActiveListings();

    result = result.filter(item => {
      return item?.endTimeInEpochSeconds;
    })

    getList(result)
  }

  const placeBid = async (id) => {
    try {
      const res = await marketplaceModule.auction.makeBid(id, 0.001)
      console.log(res)
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <div className="App">
      <header className="App-header">Thirdweb React Example
        <div style={{
          margin: '10px'
        }}>
          {address ? <div>
            <p>
              Connected to {address}
            </p>
            {list.length > 0 ?
              <div>
                {list.map(item => (
                  <div>
                    <span style={{
                      margin: '10px'
                    }}>{item.id}</span>
                    <span style={{
                      margin: '10px'
                    }}>{item?.asset?.name}</span>
                    <span style={{
                      margin: '10px'
                    }}>{item?.asset?.description}</span>
                    <button style={{
                      margin: '10px'
                    }} onClick={() => placeBid(item.id)}>Buy</button>
                  </div>
                ))}
              </div>
              : <button onClick={getData}>Get Listing</button>
            }
          </div>
            :
            <button

              onClick={() => {
                connectWithMetamask();
              }}
            >
              Connect Wallet
            </button>
          }
        </div>

      </header>
    </div>
  );
}

export default App;
