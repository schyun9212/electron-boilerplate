import { app, session } from "electron";
import { resolve } from "path";
import { Schemes } from "../common/network";

type ProtocolCallback = (response: string | Electron.ProtocolResponse) => void;

export class FileProtocolService {
  private readonly rootDir: string;

  // TODO: Handle rootdir using interface
  constructor() {
    // TODO: Determine how to handle rootDir without hard coding
    this.rootDir = `${app.getAppPath()}/dist/${Schemes.appFile}`;
    this.handleProtocols();
  }

  private handleProtocols() {
    const { defaultSession } = session;

    // Block any file:// access
    defaultSession.protocol.interceptFileProtocol(
      Schemes.file,
      this.handleFileRequest
    );

    // Register app-file:// protocol
    defaultSession.protocol.registerFileProtocol(
      Schemes.appFile,
      this.handleAppFileRequest
    );
  }

  private handleFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    // TODO: Print message using log service
    console.error(
      `Refused to load resource ${request.url} from ${Schemes.file} protocol`
    );

    return callback({ error: -3 /* ABORTED */ });
  }

  private handleAppFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    const path = request.url.substring(Schemes.appFile.length + 3);
    const resolvedPath = resolve(this.rootDir, path);

    console.log(`Get request ${request} from ${Schemes.appFile} protocol`);
    return callback({ path });
  }

  public isValidURL(url: string) {
    return url.startsWith(this.rootDir);
  }
}
