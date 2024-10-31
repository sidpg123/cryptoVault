import CryptoJS from 'crypto-js';

/**
 * Encrypt sensitive data using AES encryption.
 * @param data The data to encrypt (e.g., private key, secret phrase).
 * @param password The password to use for encryption.
 * @returns Encrypted data as a string.
 */
function encryptData(data: string, password: string): string {
    return CryptoJS.AES.encrypt(data, password).toString();
}

/**
 * Decrypt encrypted data using AES decryption.
 * @param encryptedData The encrypted data string to decrypt.
 * @param password The password to use for decryption.
 * @returns Decrypted data as a string or null if decryption fails.
 */
function decryptData(encryptedData: string, password: string): string | null {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedData) throw new Error("Invalid password");
        return decryptedData;
    } catch (error) {
        alert("Incorrect password. Please try again.");
        return null;
    }
}

/**
 * Store encrypted data in localStorage under a specified key.
 * @param storageKey The localStorage key under which to store the data.
 * @param encryptedData The encrypted data to store.
 */
function storeEncryptedData(storageKey: string, encryptedData: string): void {
    localStorage.setItem(storageKey, encryptedData);
}

/**
 * Retrieve and decrypt data from localStorage.
 * @param storageKey The localStorage key where encrypted data is stored.
 * @param password The password to use for decryption.
 * @returns Decrypted data as a string or null if decryption fails.
 */
function retrieveDecryptedData(storageKey: string, password: string): string | null {
    const encryptedData = localStorage.getItem(storageKey);
    if (!encryptedData) return null;
    return decryptData(encryptedData, password);
}




export {
    encryptData,
    decryptData,
    storeEncryptedData,
    retrieveDecryptedData
};
