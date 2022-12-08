import { protocol } from "electron";
import { normalize } from "path";

// TODO: Move to config
export const FS_PROTOCOL = "file";

export function registerFileProtocol(rootDir: string) {
  protocol.registerFileProtocol(FS_PROTOCOL, (req, callback) => {
    const url = req.url.substring(FS_PROTOCOL.length + 3);

    return callback({
      path: normalize(url),
    });
  });
}
