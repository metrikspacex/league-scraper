import type { ClientRequestArgs, IncomingMessage } from "node:http";

import { vi } from "vitest";

function mockRequest(
  _options: ClientRequestArgs,
  _callback?: ((_response: IncomingMessage) => void) | undefined
) {
  if (_callback) {
    const _mockResponse = {
      host: _options.host,
      method: _options.method,
      path: _options.path,
      protocol: _options.protocol,
    };
    _callback(_mockResponse as any);
  }
  return {
    end(_chunk: any, _encoding: BufferEncoding, _callback?: () => void) {
      // empty
    },
    on(_event: "end" | "error" | "data", _listener: (...args: any[]) => void) {
      switch (_event) {
        case "error": {
          // empty
          break;
        }
        case "data": {
          // empty
          break;
        }
        case "end": {
          // empty
          break;
        }
        // No default
      }
    },
  };
}

function createMockHttps(_statusCode: number) {
  vi.mock("node:https", async () => {
    const https =
      await vi.importActual<typeof import("node:https")>("node:https");

    return {
      ...https,
      request: vi.fn(mockRequest),
    };
  });
}

export { createMockHttps };
