export const TokenMap = {
  OMG: '0xcc2704ce33089d0f051eb0aff1750bb99fdfab46',
  ETH: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
};

export const getTokenNameFromAddress = (tokenAddress) => {
  for (let tokenName in TokenMap) {
    if (TokenMap[tokenName] == tokenAddress) 
      return tokenName;
  }

  return undefined;
}

export const getTokenAddressFromName = (tokenName) => {
  return TokenMap[tokenName];
}