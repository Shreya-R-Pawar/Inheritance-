// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
//added events

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
//import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract artAuction is ERC721 {
    //NFT MINTING-------------------------------------------------------------------------------
    //using ECDSA for bytes32;
    //using MessageHashUtils for bytes32;

    address public admin;
    constructor() ERC721("artAuction", "ART") {
        admin = msg.sender;
    }

    /// STRUCTS -----------------------------------------------------------------

    struct Artwork {
        string AW_title;
        string ipfsHash;
        uint royaltyP;
        uint likes;
        bool nftMinted;
        address originalArtist;
        bool available;      //true means u can create either Ds or /auction out of it, initially = true 
    }

    struct Artist {
        string name;
        address payable artistAddress;
        string location;
        string bio;
        string username;
        string pfpHash;
    }

    struct Auction {
        uint auctionID;
        address payable seller;
        uint artID;
        address winner;
        uint winningBid;
        uint basePrice;
        uint endTime;  //in seconds ha
        bool ended;
        mapping(address => uint) refunds;
    }

    struct DS {
        uint price;
        uint artworkID;
        bool sold;
        address payable seller;    //current owner of the nft
        uint royaltyPer;
    }

    //General
    mapping(address => Artist) public artists;
    mapping(address => bool) public isRegistered;
    mapping(address => mapping(address => bool)) public isFollowing; // follower -> artist -> true/false
    mapping(uint => mapping(address => bool)) public hasLiked;
    mapping(uint => Artwork) public artworks;
    uint artworkId = 0;
    //NFT minting
    mapping(uint256 => bool) public minted; // artworks which are minted are stored here

    //Auction
    uint public auctionCount=0;
    mapping(uint => Auction) public auctions;

    //Direct
    uint public DirectSaleCount = 0;
    mapping(uint => DS) directSales;

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist"); //ownerOf comes from openzepplied and checks of the token exists or not 

        return string(abi.encodePacked("ipfs://", artworks[tokenId].ipfsHash));
    }

//NFT tokenIds & sequential order

// ERC721 doesn’t require tokenIds to be sequential — they just need to be unique.

// In our contract:

// artworkId increments when an artwork is created, not when it’s minted.

// First minted NFT could have artworkId = 7, and that’s perfectly fine.

// _safeMint(to, tokenId) only cares that tokenId hasn’t been minted yet.

// tokenURI(tokenId) just pulls metadata (IPFS hash) for that tokenId — gaps don’t matter.

// This allows artists to create multiple artworks and mint them in any order, no sequential constraints.

// Basically: creation order ≠ mint order ≠ sequential tokenIds. Gaps are fine.
    function mintNFT(address to, uint artId) internal {
        require(!minted[artId], "NFT already minted");

        Artwork storage art = artworks[artId];

        require(art.originalArtist != address(0), "Artwork does not exist");

        minted[artId] = true;
        art.nftMinted = true;

        _safeMint(to, artId);
    }

    event Registered(
        address indexed newUser,
        string indexed name,
        string indexed pfp
    );
    // GENERAL FUNCTIONS -------------------------------------------------------------------
    function registerUser(
        string memory _name,
        string memory _location,
        string memory _bio,
        string memory _username,
        string memory _pfpHash
    ) public {
        require(!isRegistered[msg.sender], "Already registered");
        Artist storage artist = artists[msg.sender];

        artist.name = _name;
        artist.artistAddress = payable(msg.sender);
        artist.location = _location;
        artist.bio = _bio;
        artist.username = _username;
        artist.pfpHash = _pfpHash;

        isRegistered[msg.sender] = true;
        emit Registered(msg.sender, _username, _pfpHash);
    }

    function login() public view returns (bool) {
        return isRegistered[msg.sender];
    }

    event artworkAdded(
        address indexed artist,
        string indexed title,
        bool minted
    );

    function createArtwork(
        string memory _AW_title,
        string memory _ipfsHash,
        uint _royaltyP
    ) public {
        require(isRegistered[msg.sender], "Please register");
        Artwork storage artwork = artworks[artworkId];
        artworkId++;
        artwork.AW_title = _AW_title;
        artwork.originalArtist = msg.sender;
        artwork.ipfsHash = _ipfsHash;
        artwork.royaltyP = _royaltyP;
        artwork.likes = 0;
        artwork.nftMinted = false;

        emit artworkAdded(msg.sender, _AW_title, false);
    }

    event ArtworkLiked(
        address indexed artist,
        uint indexed artWorkID,
        string indexed name,
        address liker,
        bool likeUnlikeArtwork // same event is used for liking and unliking and even if it has same index params it wont clash in frontend the graph will still distinguish both events
    );

    function LikeUnlike( uint _artWorkID) public {
        bool liked;
        Artist storage artist = artists[msg.sender];
        Artwork storage artwork = artworks[_artWorkID];
        require(isRegistered[msg.sender], "Please register to like");
        require(msg.sender != artwork.originalArtist, "Cannot like own artwork");

        if (!hasLiked[_artWorkID][msg.sender]) {
            hasLiked[_artWorkID][msg.sender] = true;
            liked = true;
        } else if (hasLiked[_artWorkID][msg.sender]) {
           // require(!hasLiked[_artWorkID][msg.sender]);
            hasLiked[_artWorkID][msg.sender] = false;
            liked = false;
        }
        emit ArtworkLiked(artwork.originalArtist, _artWorkID, artist.name, msg.sender, liked);
    }

    event FollowUnFollowArtist(
        address indexed artist,
        address indexed follower,
        uint timestamp,
        bool followUnfollow
    );

    function FollowUnfollow(address _artistAddr) public {
        //WORKS!
        bool follow;
        require(isRegistered[msg.sender], "Please register to follow");
        require(msg.sender != _artistAddr, "Cannot follow yourself"); 

        if (isFollowing[msg.sender][_artistAddr]) {
            isFollowing[msg.sender][_artistAddr] = false;
            follow = false;
        } else if (!isFollowing[msg.sender][_artistAddr]) {
            isFollowing[msg.sender][_artistAddr] = true;
            follow = true;
        }
        emit FollowUnFollowArtist(
            _artistAddr,
            msg.sender,
            block.timestamp,
            follow
        );
    }

    //AUCTION FUNCTIONS -------------------------------------------------------------------------
    event auctionCreated(uint indexed auctionID, string indexed artworkTitle, address indexed seller, uint basePrice);

    function createAuction(
        uint _artID,
        uint _basePrice,
        uint duration  //take in seconds from frontend
    ) public {
        auctionCount++;
        Auction storage auction = auctions[auctionCount];

        
        auction.auctionID = auctionCount;
        auction.seller = payable(msg.sender);
        auction.artID = _artID;
        auction.basePrice = _basePrice ;
        auction.endTime = block.timestamp + duration;
        auction.ended = false;
        auction.winner = address(0);
        auction.winningBid = 0;
        Artwork storage artwork = artworks[_artID];
       emit  auctionCreated(auctionCount,artwork.AW_title,msg.sender,_basePrice);

        artwork.available= false;


    }

    event bidPlaced(uint indexed auctionID, address indexed bidder, string bidderName, uint bid);

    function placeBid(uint auctionID) public payable {
        require(
            isRegistered[msg.sender],
            "Please register to participate in auctions"
        );
        Auction storage auction = auctions[auctionID];
        uint minBid;

        require(block.timestamp <= auction.endTime, "Auction ended");

        if (auction.winner == address(0)) {
            minBid = auction.basePrice;
        } else {
            minBid = auction.winningBid;
        }
        require(msg.value >= minBid, "Bid too low");

        
        auction.refunds[msg.sender] += msg.value;

        auction.winner = msg.sender;
        auction.winningBid = msg.value;
        Artist storage artist = artists[msg.sender];
        emit bidPlaced(auctionID, msg.sender, artist.name, msg.value);
    }

    event auctionEnded(
        uint indexed auctionID,
        address indexed auctionWinner,
        uint indexed auctionWinningBid,
        string auctionWinnerName,
        string artworkName
    );

    function endAuction(uint auctionID) public {
        Auction storage auction = auctions[auctionID];
        Artwork storage artwork = artworks[auction.artID];
        // Artist storage artist = artists[auction.]; //////////
        require(!auction.ended ,"Auction has already ended");
        require( msg.sender==auction.seller || block.timestamp > auction.endTime,
            "Not authorised to end auction"
        );

        if (auction.winner == address(0)) {
            return;
        }


        if (artwork.originalArtist != auction.seller) {
            uint royaltyPercentage = artwork.royaltyP;
            uint royaltyAmt = (royaltyPercentage * auction.winningBid) / 100;
            uint sellerAmt = auction.winningBid - royaltyAmt;

            _safeTransfer(auction.seller, auction.winner, auction.artID);

            (bool Asuccess, ) = artwork.originalArtist.call{value: royaltyAmt}("");
            require(Asuccess, "Transfer of royalty to artist failed");

            (bool Ssuccess, ) = auction.seller.call{value: sellerAmt}("");
            require(Ssuccess, "Transfer to seller failed");
        } else {
            mintNFT(auction.winner, auction.artID);

            (bool success, ) = artwork.originalArtist.call{value: auction.winningBid}("");
            require(success, "Transfer failed");
        }
        auction.ended = true;
        Artist storage winner = artists[auction.winner];
        emit auctionEnded(auctionID, auction.winner, auction.winningBid,winner.name,artwork.AW_title);
    }

    function withdrawRefund(uint auctionID) public { //called by participants of auction who didnt win
        Auction storage auction = auctions[auctionID];
        require(auction.ended, "Auction hasn't ended yet");
        require(auction.refunds[msg.sender] > 0, "No refund due");
        if(msg.sender==auction.winner){
            uint refund = auction.refunds[msg.sender]-auction.winningBid;
            (bool success, ) = msg.sender.call{value: refund}("");
            require(success, "Refund transfer failed");
        }else{
        (bool success, ) = msg.sender.call{value: auction.refunds[msg.sender]}("");
        require(success, "Refund transfer failed");
        }
        auction.refunds[msg.sender] = 0;
    }

    //DIRECT SALES ------------------------------------------------------------------------------------

    event createdDirectSale(uint indexed DSId, string title, uint price);


    function createDS(uint _price, uint _artworkID) public {
        DirectSaleCount++;
        DS storage directSale = directSales[DirectSaleCount];
        Artwork storage artwork = artworks[_artworkID];
        directSale.seller = payable(msg.sender);
        directSale.price = _price ;
        directSale.artworkID = _artworkID;
        directSale.sold = false;
        artwork.available=false;
        emit createdDirectSale(DirectSaleCount, artwork.AW_title, _price);
    }

    event artworkBought(uint indexed DSid, string artworkTitle, address indexed buyer);

    function buyDSArtwork(uint DSid) public payable {
        require(isRegistered[msg.sender], "Please register to buy artwork");

        DS storage directSale = directSales[DSid];
        Artwork storage artwork = artworks[directSale.artworkID];
        require(!directSale.sold, "This artwork has already been sold");
        require(msg.value == directSale.price, "Price is incorrect");


        if (directSale.seller == artwork.originalArtist) {    //First time sale, current owner = orArgsist
            mintNFT(msg.sender, directSale.artworkID); //creating nft and minting directly to buyer, not making ogArtist as first owner
            (bool success, ) = artwork.originalArtist.call{value: msg.value}("");
            require(success, "Payment to artist failed");
            directSale.sold = true;

        } else {
            uint royaltyPercentage = artwork.royaltyP;
            uint Royalty = (msg.value * royaltyPercentage) / 100;
            uint sellerAmt = msg.value - Royalty;

            _safeTransfer(directSale.seller, msg.sender, directSale.artworkID, ""); //transfer ownership

            (bool successRoyalty, ) = artwork.originalArtist.call{value: Royalty}(
                ""
            );
            require(successRoyalty, "Royalty transfer failed");

            (bool successSeller, ) = directSale.seller.call{value: sellerAmt}(
                ""
            );
            require(successSeller, "Payment to seller failed");

            directSale.sold = true;
        }
        emit artworkBought(DSid,artwork.AW_title ,msg.sender);
    }

    function endDS(uint dsId) public { //befre sold, cdetele Ds and ake image available again
        DS storage directSale = directSales[dsId];
        require(
            msg.sender == directSale.seller,
            "only artist can end the sale"
        );
        require(!directSale.sold, "you cant end an inactive sale");
        directSale.sold = true;
        Artwork storage artwork = artworks[directSale.artworkID];
        artwork.available = true;
    }
}