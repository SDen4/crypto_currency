import { useEffect, useState } from 'react';
import axios from 'axios';
import cl from './styles.module.css';
import { timestamp } from '../../utils/timestamp';

interface ILastBlockInfo {
  timestamp: number;
  height: number;
  tx_count: number;
}

interface ICurrBlockInfo {
  medianFee: number;
  totalFees: number;
  blockSize: number;
  nTx: number;
}

export const BtcBlockInfoContent = () => {
  const [lastBlock, setLastBlock] = useState<ILastBlockInfo | null>(null);
  const [currBlock, setCurrBlock] = useState<ICurrBlockInfo[] | null>(null);

  useEffect(() => {
    axios
      .get('https://mempool.space/api/v1/fees/mempool-blocks')
      .then((res) => setCurrBlock(res.data));

    axios
      .get('https://mempool.space/api/blocks/tip/hash')
      .then((res) => res.data)
      .then((hash) => axios.get(`https://mempool.space/api/block/${hash}`))
      .then((res) => setLastBlock(res.data))
      .catch((error) => console.error(error));
  }, []);

  if (!lastBlock || !currBlock) return <p>No data</p>;

  return (
    <div className={cl.wrapper}>
      <b>Last block</b>
      <span>{timestamp(lastBlock?.timestamp, true)}</span>
      <span>Id: {lastBlock?.height}</span>
      <span>Transactions: {lastBlock?.tx_count}</span>

      <div className={cl.divider} />

      <b>Current block</b>
      <span>
        Median fee: {Math.ceil(currBlock[0].medianFee).toFixed()} sat/vB
      </span>
      <span>
        Total fees: {(Math.ceil(currBlock[0].totalFees) / 100000000).toFixed(3)}{' '}
        BTC
      </span>
      <span>Size: {(currBlock[0].blockSize / 1000000).toFixed(2)} MB</span>
      <span>Transactions: {currBlock[0].nTx}</span>
    </div>
  );
};
