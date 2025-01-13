import {
    Action,
    IAgentRuntime,
    Memory,
    HandlerCallback,
    State,
} from "@elizaos/core";

// Mock RPC endpoint for now
const mockRpcCall = async (method: string, params: Record<string, unknown>) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        jsonrpc: "2.0",
        result: {
            method,
            params,
            timestamp: new Date().toISOString(),
        },
    };
};

export const makeRpcCallAction = {
    name: "MAKE_RPC_CALL",
    description: "Make a RPC call (mocked for now)",
    similes: [],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => true,
    async handler(
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: Record<string, unknown>,
        callback: HandlerCallback
    ): Promise<void> {
        try {
            const method =
                message.content?.method?.toString() || "defaultMethod";
            const params =
                (message.content?.params as Record<string, unknown>) || {};

            const response = await mockRpcCall(method, params);
            callback(
                {
                    text: `RPC call successful:\n${JSON.stringify(response, null, 2)}`,
                    metadata: response,
                },
                []
            );
        } catch (error) {
            callback(
                {
                    text: `RPC call failed: ${error instanceof Error ? error.message : "Unknown error"}`,
                    metadata: { error: true },
                },
                []
            );
            throw error;
        }
    },
    examples: [],
} as Action;
