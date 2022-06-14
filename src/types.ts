export type Noop = "Noop";

declare global {
  interface Window {
    restServer: any;
  }
}

export interface ChangeEvent<T = string> {
  target: {
    value: T;
    name?: string;
  };
}
