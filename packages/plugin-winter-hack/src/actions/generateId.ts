import {
    Action,
    IAgentRuntime,
    Memory,
    HandlerCallback,
    State,
} from "@elizaos/core";
import { v4 as uuidv4 } from "uuid";

export const generateLibp2pIdAction = {
    name: "GENERATE_LIBP2P_ID",
    description: "Generate a new libp2p ID (using UUID for now)",
    similes: [],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => true,
    async handler(
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: Record<string, unknown>,
        callback: HandlerCallback
    ): Promise<void> {
        const id = uuidv4();
        callback(
            {
                text: `Generated libp2p ID: ${id}`,
                metadata: { id },
            },
            []
        );
    },
    examples: [],
} as Action;
