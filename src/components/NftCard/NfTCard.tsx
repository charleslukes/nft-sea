import styles from "./NftCard.module.css";

type NfTCardPropType = {
  name: string;
  image: string;
  id: number | string;
  symbol: string;
  handleClick(id: number | string): void;
};

const NftCard: React.FC<NfTCardPropType> = ({
  name,
  image,
  id,
  symbol,
  handleClick,
}) => {
  return (
    <div className={styles.cardContainer} onClick={() => handleClick(id)}>
      <div>
        <img src={image} alt="nft image" className={styles.cardImage} />
      </div>
      <h5 className={styles.headerText}>{name}</h5>
      <div className={styles.priceColor}>{symbol}</div>
    </div>
  );
};

export default NftCard;
