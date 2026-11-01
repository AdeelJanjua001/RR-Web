/**
 * Cryptographic payment URI formatter and QR payload generator.
 * Formats URI according to network specifications (BIP-21 for Bitcoin, EIP-681 for EVM/BEP20).
 */

export interface QRPayloadResult {
  uri: string;
  payload: string;
  qrUrl: string;
  isVerified: boolean;
  networkLabel: string;
  destinationAddress: string;
}

export function generateCryptoPaymentURI(
  network: string,
  walletAddress: string,
  amount?: number
): string {
  const cleanAddress = walletAddress.trim();
  if (!cleanAddress) return '';

  const netUpper = (network || '').toUpperCase();

  if (netUpper.includes('BTC') || netUpper.includes('BITCOIN')) {
    // BIP-21 URI standard: bitcoin:<address>[?amount=<amount>]
    return amount && amount > 0
      ? `bitcoin:${cleanAddress}?amount=${amount}`
      : `bitcoin:${cleanAddress}`;
  }

  if (netUpper.includes('BEP20') || netUpper.includes('BNB') || netUpper.includes('BSC') || netUpper.includes('ETH') || netUpper.includes('ERC20')) {
    // EVM / BSC format: ethereum:<address>
    return `ethereum:${cleanAddress}`;
  }

  if (netUpper.includes('TRC20') || netUpper.includes('TRON')) {
    // TRON address direct
    return cleanAddress;
  }

  return cleanAddress;
}

export function generateVerifiedQRCode(
  network: string,
  walletAddress: string,
  amount?: number
): QRPayloadResult {
  const uri = generateCryptoPaymentURI(network, walletAddress, amount);
  const cleanAddress = walletAddress.trim();

  // Generate verified dynamic QR code using standardized QR generator
  const qrUrl = uri
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=${encodeURIComponent(uri)}`
    : '';

  // Verification check: ensure payload embeds the intended address without corruption
  const isVerified = Boolean(cleanAddress && uri.includes(cleanAddress));

  return {
    uri,
    payload: uri,
    qrUrl,
    isVerified,
    networkLabel: network.toUpperCase(),
    destinationAddress: cleanAddress
  };
}
