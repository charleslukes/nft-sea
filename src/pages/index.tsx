import Head from "next/head";
import NftCard from "@/components/NftCard/NfTCard";
import Modal from "react-modal";
import NftCardDetails from "@/components/NftCardDetails/NftCardDetails";
import { useHome } from "@/hooks/useHome";

Modal.setAppElement("#main-container");

export default function Home() {
  const {
    modalIsOpen,
    customStyles,
    allNfts,
    nftDetails,
    handleClick,
    closeModal,
    handleOpenSeaClick,
    handleSearchCollectibles,
    searchInputChange,
  } = useHome();

  return (
    <>
      <Head>
        <title>Nft Sea</title>
        <meta name="description" content="Nft sea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-container" id="main-container">
        <div className="container">
          <header className="header-container">
            <div>
              <h2 className="title">NFT SEA</h2>
              <div className="title-input">
                <input
                  type="text"
                  placeholder="Search Collectibles on Goerli"
                  onChange={searchInputChange}
                  onKeyDown={handleSearchCollectibles}
                />
              </div>
            </div>
          </header>
          <h3 className="header-text">Explore</h3>
          <div className="nft-container">
            {allNfts.map((data, index) => (
              <NftCard
                handleClick={handleClick}
                key={index}
                id={data.tokenId}
                name={data.title}
                image={data?.media[0]?.gateway}
                symbol={data?.contract?.symbol}
              />
            ))}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="NFT details"
        >
          <NftCardDetails
            name={nftDetails?.title}
            image={nftDetails?.media[0]?.gateway}
            description={nftDetails?.description}
            ownerAddr={nftDetails?.ownerAddr}
            handleClick={handleOpenSeaClick}
          />
        </Modal>
      </main>
    </>
  );
}
