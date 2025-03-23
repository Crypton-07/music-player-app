export const extractDominantColor = async (imageUrl) => {
  const colorMap = {
    "https://m.media-amazon.com/images/I/814htMhuuML.jpg": {
      primary: "#D90130",
      secondary: "#094CAB",
    },
    "https://i1.sndcdn.com/artworks-G6GD95NLQV3Q-0-t500x500.jpg": {
      primary: "#85888D",
      secondary: "#8A6167",
    },
    "https://c.saavncdn.com/223/Jab-We-Met-Hindi-2007-20231016162009-500x500.jpg":
      {
        primary: "#36656C",
        secondary: "#FEC408",
      },
    "https://pagalnew.com/coverimages/Ajab-Si-Om-Shanti-Om-500-500.jpg": {
      primary: "#753973",
      secondary: "#E3ED8D",
    },
    "https://i.ytimg.com/vi/fKopy74weus/sddefault.jpg": {
      primary: "#CECECE",
      secondary: "#3E3B3E",
    },
    "https://i1.sndcdn.com/artworks-YL3ua1FAzIzzSk0e-OWj0qw-t1080x1080.jpg": {
      primary: "#F6F7F7",
      secondary: "#544731",
    },
    "https://lastfm.freetls.fastly.net/i/u/ar0/48c1f186bdb8690ef1b481cfaf02d183.jpg":
      {
        primary: "#2B9ADD",
        secondary: "#EE2F48",
      },
    "https://i.ytimg.com/vi/10z0lQlw3Sk/maxresdefault.jpg": {
      primary: "#D5D5C9",
      secondary: "#775549",
    },
  };

  return colorMap[imageUrl] || { primary: "#555555", secondary: "#333333" };
};
