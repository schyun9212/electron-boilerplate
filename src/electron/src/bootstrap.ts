import { protocol } from "electron";
import { Schemas } from "./common/network";

// TODO: register priviliged schemas dynamically
const customSchemes: Electron.CustomScheme[] = [
  {
    scheme: Schemas.appFile,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: false,
      corsEnabled: false,
    },
  },
];

function registerListeners() {}

protocol.registerSchemesAsPrivileged(customSchemes);
registerListeners();
