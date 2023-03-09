import styles from "./NftCardDetails.module.css";

type NftCardDetailsPropType = {
  name: string;
  image: string;
  description: string;
  ownerAddr: string;
  handleClick(): void;
};

const NftCardDetails: React.FC<NftCardDetailsPropType> = ({
  name,
  description,
  image,
  ownerAddr,
  handleClick,
}) => {    
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt="nft image" className={styles.image} />
        <h4 className={styles.descriptionHeader}>Description</h4>
        <div className={styles.description}>{description}</div>
      </div>
      <div>
        <h3>{name}</h3>
        <div className={styles.ownerContainer}>
          <div>Owned by: </div>
          <div className={styles.description}>{ownerAddr}</div>
        </div>
        <div>
          <button className={styles.btn} onClick={handleClick}>
            View on Opensea
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftCardDetails;
