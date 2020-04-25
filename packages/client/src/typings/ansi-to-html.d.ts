declare module "ansi-to-html" {
  interface ConvertOptions {
    fg?: string;
    bg?: string;
    newline?: boolean;
    escapeXML?: boolean;
    stream?: boolean;
    colors?: string[] | { [code: number]: string };
  }
  class Convert {
    constructor(option: ConvertOptions);

    toHtml: (input: string | string[]) => string;
  }
  export = Convert;
}
