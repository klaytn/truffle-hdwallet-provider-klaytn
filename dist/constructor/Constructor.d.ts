import { Mnemonic, MnemonicPhrase, PrivateKey, ProviderOrUrl, AddressIndex, NumberOfAddresses, PollingInterval, ShareNonce, DerivationPath, ChainId, ChainSettings } from "./types";
export interface MnemonicSigningAuthority {
    mnemonic: Mnemonic;
}
export interface MnemonicPhraseSigningAuthority {
    mnemonic: MnemonicPhrase;
}
export interface PrivateKeysSigningAuthority {
    privateKeys: PrivateKey[];
}
export declare type SigningAuthority = MnemonicSigningAuthority | PrivateKeysSigningAuthority;
export declare type InputSigningAuthority = MnemonicSigningAuthority | MnemonicPhraseSigningAuthority | PrivateKeysSigningAuthority;
export interface CommonOptions {
    providerOrUrl: ProviderOrUrl;
    addressIndex?: AddressIndex;
    numberOfAddresses?: NumberOfAddresses;
    shareNonce?: ShareNonce;
    derivationPath?: DerivationPath;
    pollingInterval?: PollingInterval;
    chainId?: ChainId;
    chainSettings?: ChainSettings;
}
export declare type Options = SigningAuthority & CommonOptions;
export declare type InputOptions = InputSigningAuthority & CommonOptions;
