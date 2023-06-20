const LoadEnvVariables = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? '';
  if (!serverUrl) {
    throw new Error("Cannot read server URL");
  }
  const nameLimit = process.env.NEXT_PUBLIC_NAME_LIMIT ?? '';
  if (!nameLimit) {
    throw new Error("Cannot read Name limit");
  }
  const nameLimitValue = parseInt(nameLimit);
  const roomIDLimit = process.env.NEXT_PUBLIC_ROOMID_LIMIT;
  if (!roomIDLimit) {
    throw new Error("Cannot read Room ID limit");
  }
  const roomIDLimitValue = parseInt(roomIDLimit);
  return {
    serverUrl: serverUrl,
    nameLimit: nameLimitValue,
    roomIDLimit: roomIDLimitValue
  }
}

export default LoadEnvVariables
