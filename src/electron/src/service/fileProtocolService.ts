import { app, session } from "electron";
import { resolve } from "path";
import { Schemas } from "../lib/network";

import { existsSync, mkdir } from "fs";

type ProtocolCallback = (response: string | Electron.ProtocolResponse) => void;

export class FileProtocolService {
  private readonly _rootDir: string;

  // TODO: Handle rootdir using interface
  constructor() {
    this.handleProtocols();

    // TODO: Determine how to handle rootDir without hard coding
    this._rootDir = `${app.getAppPath()}/dist/${Schemas.appFile}`;
    console.log(this._rootDir);

    if (!existsSync(this._rootDir)) {
      mkdir(this._rootDir, (e) => {
        if (e === null) return;

        // TODO: Determine what we have to do if we cannot use fs
        console.error(e);
      });
    }
  }

  private handleProtocols() {
    const { defaultSession } = session;

    // Block any file:// access
    defaultSession.protocol.interceptFileProtocol(
      Schemas.file,
      (request, callback) => this.handleFileRequest(request, callback)
    );

    // Register app-file:// protocol
    defaultSession.protocol.registerFileProtocol(
      Schemas.appFile,
      (request, callback) => this.handleAppFileRequest(request, callback)
    );
  }

  private handleFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    // TODO: Print message using log service
    console.error(
      `Refused to load resource ${request.url} from ${Schemas.file} protocol`
    );

    return callback({ error: -3 /* ABORTED */ });
  }

  private handleAppFileRequest(
    request: Electron.ProtocolRequest,
    callback: ProtocolCallback
  ) {
    const path = request.url.substring(Schemas.appFile.length + 3);
    const resolvedPath = resolve(this._rootDir, path);

    if (this.isValidURL(resolvedPath)) {
      return callback({ path: resolvedPath });
    }

    return callback({ error: -3 /* ABORTED */ });
  }

  public isValidURL(url: string) {
    const resolvedURL = resolve(url);
    return resolvedURL.startsWith(this._rootDir);
  }
}
