export const TokenMap = {
  OMG: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
  WETH: '0x2956356cd2a2bf3202f771f50d3d14a367b48070',
  ZRX: '0xe41d2489571d322189246dafa5ebde1f4699f498'
};

export const getTokenNameFromAddress = (tokenAddress) => {
  for (let tokenName in TokenMap) {
    if (TokenMap[tokenName] === tokenAddress)
      return tokenName;
  }

  return undefined;
}

export const getTokenAddressFromName = (tokenName) => {
  return TokenMap[tokenName];
}
