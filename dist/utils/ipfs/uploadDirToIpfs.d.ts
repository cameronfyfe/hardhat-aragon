/**
 * Uploads dist folder to IPFS
 * Applies various ignore patterns:
 * - .ipfsignore
 * - .gitignore
 */
export declare function uploadDirToIpfs({ dirPath, ipfs, ignore, progress, }: {
    dirPath: string;
    ipfs: any;
    ignore?: string[];
    progress?: (totalBytes: number) => void;
}): Promise<string>;
//# sourceMappingURL=uploadDirToIpfs.d.ts.map