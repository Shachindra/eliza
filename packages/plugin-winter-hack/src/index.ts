import { Plugin } from "@elizaos/core";
import { generateLibp2pIdAction, makeRpcCallAction } from "./actions";

export const winterHackPlugin: Plugin = {
    name: "winter-hack",
    description: "Plugin for winter hack functionalities",
    actions: [generateLibp2pIdAction, makeRpcCallAction],
    evaluators: [],
    providers: [],
};

export default winterHackPlugin;
