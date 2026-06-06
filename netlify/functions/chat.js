import OpenAI from 'openai';

export const handler = async (event, context) => {
  // CORS 預檢請求處理
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { history, message } = JSON.parse(event.body);

    // 1. 初始化 OpenAI 實例，但將網址指向 OpenRouter 的端點
    // Netlify 後台的變數名記得要改成 OPENROUTER_API_KEY
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // 2. OpenRouter 使用標準 OpenAI 格式
    // 佢嘅 role 直接支援 'user' 同 'assistant'，你連轉換 role 嘅時間都慳返！
    const formattedMessages = history.map(msg => ({
      role: msg.role, 
      content: msg.parts[0].text // 提取文字內容
    }));

    // 塞入最新問題
    if (formattedMessages.length === 0 || formattedMessages[formattedMessages.length - 1].content !== message) {
      formattedMessages.push({ role: 'user', content: message });
    }

    // 3. 喺陣列最前排塞入 System Prompt（人設限制）
    formattedMessages.unshift({
      role: 'system',
      content: "你係 EVkeeper 智能 AI 診斷專家。請完全使用香港廣東話、口語化且極具專業車主口吻來解答有關電動車充電、SOH（健康度）的問題。"
    });

    // 4. 呼叫 OpenRouter 嘅免費模型
    // 你可以隨時換做其他 OpenRouter 上的免費模型，例如 "deepseek/deepseek-chat:free" 
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: formattedMessages,
    });

    // 5. 回傳答案給前端
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: completion.choices[0].message.content }),
    };

  } catch (error) {
    console.error("OpenRouter 中轉出錯:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "OpenRouter 思考途中發生故障： " + error.message }),
    };
  }
};