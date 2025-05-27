
# 🧠 OpenAI Realtime Structured Data Enrichment API (Node.js)

This project is a simple Node.js + Express API that uses OpenAI's GPT-4 tool calling (function calling) to enrich user profile data in real-time.

---

## ✨ Features

- 🔗 Integration with OpenAI GPT-4 API  
- 🛠️ Tool (function) calling for structured JSON output  
- 📬 POST API to enrich user profile data  
- ⚡ Real-time inference of fields like profession and personality  

---

## 📦 Technologies Used

- Node.js  
- Express  
- OpenAI SDK  
- dotenv  

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/openai-structured-data-api.git
cd openai-structured-data-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root with your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## ▶️ Run the Server

```bash
node index.js
```

Your API will be available at:

```
http://localhost:3000/enrich-profile
```

---

## 📥 Sample Request

**POST** `/enrich-profile`

```json
{
  "name": "Ananya Sharma",
  "age": 28,
  "city": "Bengaluru",
  "interests": ["coding", "design", "startups"]
}
```

---

## 📤 Sample Response

```json
{
  "name": "Ananya Sharma",
  "age": 28,
  "city": "Bengaluru",
  "interests": ["coding", "design", "startups"],
  "likely_profession": "UX/Product Designer in a tech startup",
  "personality": "Creative, ambitious, and detail-oriented"
}
```

---

## 📚 How It Works

1. User profile data is sent via a POST request.
2. GPT-4 interprets the data and uses function calling to return a structured, enriched profile.
3. The server parses the function result and returns clean JSON to the client.

---

## 🧪 Testing

You can test the endpoint using any HTTP client like:

- [Postman](https://www.postman.com/)
- [Hoppscotch](https://hoppscotch.io/)
- `curl` (command line)

Example:

```bash
curl -X POST http://localhost:3000/enrich-profile \
-H "Content-Type: application/json" \
-d '{"name": "Ananya Sharma", "age": 28, "city": "Bengaluru", "interests": ["coding", "design", "startups"]}'
```

---

## 🛡️ Error Handling

If the OpenAI API fails or returns invalid data, you'll get:

```json
{
  "error": "Failed to enrich data"
}
```

Make sure your `OPENAI_API_KEY` is valid and you're using GPT-4.

---

## 🧠 How OpenAI Returns Structured JSON (Tool Calling vs. JSON Mode)

This project uses **tool calling**, not `response_format: "json"`.

### ✅ Tool Calling (used here)

- We define a function (`enrich_profile`) with a JSON schema.
- GPT-4 returns structured JSON inside `tool_calls[0].function.arguments`.
- We parse it like this:

```js
const toolCallArgs = response.choices[0].message.tool_calls?.[0]?.function.arguments;
const enrichedData = JSON.parse(toolCallArgs);
```

### 🔄 Why not `response_format: "json"`?

- `response_format: "json"` is used for **JSON Mode**, where GPT directly responds with a JSON block.
- Tool calling is **more structured and reliable** for predefined schema extraction.

---

## 📄 License

MIT License  
Feel free to use, modify, and distribute this project with attribution.
