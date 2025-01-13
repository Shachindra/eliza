export const createWinterHackTemplate = `
Extract the following details to create a new winter hack item:
- **name** (string): Name of the item
- **type** (string): Type of item (action1, action2, action3)
- **description** (string): Description of the item
- **metadata** (object): Additional metadata (optional)

Provide the values in the following JSON format:

\`\`\`json
{
    "name": "<item_name>",
    "type": "<item_type>",
    "description": "<item_description>",
    "metadata": {
        "<key1>": "<value1>",
        "<key2>": "<value2>"
    }
}
\`\`\`

Here are the recent user messages for context:
{{recentMessages}}
`;
