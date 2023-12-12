# Dify NodeJs Extension Template

## Quick Start

1. Clone this repository
2. Edit `expectedApiKey` in `index.js` to match your API key
3. Run `npm install`
4. Run `npm run start`

## Example payload

### Point: ping

```json
{
    "point": "ping"
}
```

```bash
curl --location 'http://localhost:3000/api/dify/receive' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 123456' \
--data '{
    "point": "ping"
}'
```

### Point: app.external_data_tool.query
```json
{
    "point": "app.external_data_tool.query",
    "params": {
        "app_id": "61248ab4-1125-45be-ae32-0ce91334d021",
        "tool_variable": "weather_retrieve",
        "inputs": {
            "location": "London"
        },
        "query": "How's the weather today?"
    }
}
```

```bash
curl --location 'http://localhost:3000/api/dify/receive' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 123456' \
--data '{
    "point": "app.external_data_tool.query",
    "params": {
        "app_id": "61248ab4-1125-45be-ae32-0ce91334d021",
        "tool_variable": "weather_retrieve",
        "inputs": {
            "location": "London"
        },
        "query": "How'\''s the weather today?"
    }
}'
```
