import { constants } from "starknet";

const BASE_URL = {
  [constants.StarknetChainId.SN_MAIN]: "https://starkscan.co",
  [constants.StarknetChainId.SN_SEPOLIA]: "https://testnet.starkscan.co",
};

export const StarkscanUrl = (chainId: constants.StarknetChainId) => ({
  transaction: (hash: string, fragment?: string) =>
    `${BASE_URL[chainId]}/tx/${hash}${fragment ? `#${fragment}` : ""}`,
  contract: (address: string, fragment?: string) =>
    `${BASE_URL[chainId]}/contract/${address}${fragment ? `#${fragment}` : ""}`,
  message: (address: string, fragment?: string) =>
    `${BASE_URL[chainId]}/message/${address}${fragment ? `#${fragment}` : ""}`,
  block: (id: string, fragment?: string) =>
    `${BASE_URL[chainId]}/block/${id}${fragment ? `#${fragment}` : ""}`,
  event: (address: string, fragment?: string) =>
    `${BASE_URL[chainId]}/event/${address}${fragment ? `#${fragment}` : ""}`,
  class: (address: string, fragment?: string) =>
    `${BASE_URL[chainId]}/class/${address}${fragment ? `#${fragment}` : ""}`,
});

const DEFAULT_PORT_BY_PROTOCOL: { [index: string]: string } = {
  "http:": "80",
  "https:": "443",
};

const URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;

const opaqueOriginSchemes = ["file:", "data:"];

/**
 * Converts a src value into an origin.
 */
export const normalize = (src: string): string => {
  if (src && opaqueOriginSchemes.find((scheme) => src.startsWith(scheme))) {
    // The origin of the child document is an opaque origin and its
    // serialization is "null"
    // https://html.spec.whatwg.org/multipage/origin.html#origin
    return "null";
  }

  // Note that if src is undefined, then srcdoc is being used instead of src
  // and we can follow this same logic below to get the origin of the parent,
  // which is the origin that we will need to use.

  const location = document.location;

  const regexResult = URL_REGEX.exec(src);
  let protocol: string;
  let hostname: string;
  let port: string;

  if (regexResult) {
    // It's an absolute URL. Use the parsed info.
    // regexResult[1] will be undefined if the URL starts with //
    protocol = regexResult[1] ? regexResult[1] : location.protocol;
    hostname = regexResult[2];
    port = regexResult[4];
  } else {
    // It's a relative path. Use the current location's info.
    protocol = location.protocol;
    hostname = location.hostname;
    port = location.port;
  }

  // If the port is the default for the protocol, we don't want to add it to the origin string
  // or it won't match the message's event.origin.

  const portSuffix =
    port && port !== DEFAULT_PORT_BY_PROTOCOL[protocol] ? `:${port}` : "";
  return `${protocol}//${hostname}${portSuffix}`;
};

export const PopupCenter = (
  url: string,
  title: string,
  w: number,
  h: number,
) => {
  var userAgent = navigator.userAgent,
    mobile = function () {
      return (
        /\b(iPhone|iP[ao]d)/.test(userAgent) ||
        /\b(iP[ao]d)/.test(userAgent) ||
        /Android/i.test(userAgent) ||
        /Mobile/i.test(userAgent)
      );
    },
    screenX =
      typeof window.screenX != "undefined" ? window.screenX : window.screenLeft,
    screenY =
      typeof window.screenY != "undefined" ? window.screenY : window.screenTop,
    outerWidth =
      typeof window.outerWidth != "undefined"
        ? window.outerWidth
        : document.documentElement.clientWidth,
    outerHeight =
      typeof window.outerHeight != "undefined"
        ? window.outerHeight
        : document.documentElement.clientHeight - 22,
    targetWidth = mobile() ? null : w,
    targetHeight = mobile() ? null : h,
    V = screenX < 0 ? window.screen.width + screenX : screenX,
    left = parseInt(String(V + (outerWidth - targetWidth) / 2), 10),
    right = parseInt(String(screenY + (outerHeight - targetHeight) / 2.5), 10),
    features = [];
  if (targetWidth !== null) {
    features.push("width=" + targetWidth);
  }
  if (targetHeight !== null) {
    features.push("height=" + targetHeight);
  }
  features.push("left=" + left);
  features.push("top=" + right);
  features.push("scrollbars=1");

  var newWindow = window.open(url, title, features.join(","));

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
};
