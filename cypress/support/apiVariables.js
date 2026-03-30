export const usersEndpoint = {
    "iso8601Regex": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "jsonSchemaAddUser": {
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "job": { "type": "string" },
            "id": { "type": "string" },
            "createdAt": { "type": "string" },
            "_meta": {
                "type": "object",
                "properties": {
                    "powered_by": { "type": "string" },
                    "docs_url": { "type": "string" },
                    "upgrade_url": { "type": "string" },
                    "example_url": { "type": "string" },
                    "variant": { "type": "string" },
                    "message": { "type": "string" },
                    "cta": {
                        "type": "object",
                        "properties": {
                            "label": { "type": "string" },
                            "url": { "type": "string" }
                        },
                        "required": [ "label", "url" ]
                    },
                    "context": { "type": "string" }
                },
                "required": [ "powered_by", "docs_url", "upgrade_url", "example_url", "variant", "message", "cta", "context" ]
            }
        },
        "required": [ "name", "job", "id", "createdAt", "_meta"]
    }
}