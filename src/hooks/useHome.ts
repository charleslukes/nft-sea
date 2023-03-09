import { nftLists } from "@/util/config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

export const useHome = () => {
  const [modalIsOpen, setIsOpen] = useState<Boolean>(false);
  const [allNfts, setAllNfts] = useState<Array<Record<string, any>>>([]);
  const [nftDetails, setNftDetails] = useState<Record<string, any>>();
  const [searchText, setSearchText] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      background: "#0c0c0c",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = async (tokenId: number | string) => {
    const selectedNft = allNfts.find((nft) => nft.tokenId === tokenId);
    let ownerAddrData = "fetching...";
    if (!!selectedNft) {
      setNftDetails({ ...selectedNft, ownerAddr: ownerAddrData });
      openModal();
      try {
        const owner = await getNftOwner(selectedNft.contract.address, +tokenId);
        ownerAddrData = owner.owners[0];
      } catch (e: any) {
        // this could happen due to rate limit
        ownerAddrData = e.message;
      }
      setNftDetails({ ...selectedNft, ownerAddr: ownerAddrData });
    }
  };

  const getAllNfts = async (contractAddress: string) => {
    // Flag to omit metadata
    const omitMetadata = false;
    // Get all NFTs
    const response = await alchemy.nft.getNftsForContract(contractAddress, {
      omitMetadata: omitMetadata,
      pageSize: 40,
    });
    setAllNfts(response.nfts);
  };

  const getNftOwner = async (contractAddress: string, tokenId: number) => {
    const owner = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);
    return owner;
  };

  // prefill with test nfts
  useEffect(() => {
    setAllNfts(nftLists.nfts);
  }, []);

  const handleSearchCollectibles = (event) => {
    if (event.key === "Enter" && searchText) {
      Web3.utils.isAddress(searchText)
        ? getAllNfts(searchText)
            .then((res) => res)
            .catch((e) => alert(e.message))
        : alert("Not a valid ethereum address");
    }
  };

  const searchInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value.trim());
  };

  const handleOpenSeaClick = () => {
    window.open(
      `https://testnets.opensea.io/assets/goerli/${nftDetails?.contract?.address}/${nftDetails?.tokenId}`
    );
  };

  return {
    modalIsOpen,
    allNfts,
    nftDetails,
    customStyles,
    searchText,
    searchInputChange,
    openModal,
    closeModal,
    handleClick,
    handleOpenSeaClick,
    handleSearchCollectibles,
  };
};
