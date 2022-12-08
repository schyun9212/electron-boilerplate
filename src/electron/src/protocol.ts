import { session } from "electron";
import { resolve } from "path";

export namespace ProtocolSchemes {
  export const http = "http";
  export const file = "file";
  export const appFile = "app-file";
}

type ProtocolCallback = (response: string | Electron.ProtocolResponse) => void;

export class FileProtocolService {
  // TODO: Handle rootdir using interface
  constructor(private readonly rootDir: string) {
    this.handleProtocols();
  }

  private handleProtocols() {
    const { defaultSession } = session;

    // Block any file:// access
    defaultSession.protocol.interceptFileProtocol(
      ProtocolSchemes.file,
      this.handleFileRequest
    );

    // Register app-file:// protocol
    defaultSession.protocol.registerFileProtocol(
      ProtocolSchemes.appFile,
      this.handleAppFileRequest
    );
  }

  private handleFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    // TODO: Print message using log service
    console.error(
      `Refused to load resource ${request.url} from ${ProtocolSchemes.file} protocol`
    );

    return callback({ error: -3 /* ABORTED */ });
  }

  private handleAppFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    const path = request.url.substring(ProtocolSchemes.appFile.length + 3);
    const resolvedPath = resolve(this.rootDir, path);

    console.log(
      `Get request ${request} from ${ProtocolSchemes.appFile} protocol`
    );
    return callback({ path });
  }

  public isValidURL(url: string) {
    return url.startsWith(this.rootDir);
  }
}
