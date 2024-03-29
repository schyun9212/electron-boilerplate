import { RestrictedEmitter } from "../common/event";

/**
 * Define action functions will be used as interface
 * <T>(payload: T) => void
 */
interface MainGlobalEvents {}

class MainEventManager
  extends RestrictedEmitter<keyof MainGlobalEvents>
  implements MainGlobalEvents {}

// This instance will work like a singleton
export const mainEventManager = new MainEventManager();
