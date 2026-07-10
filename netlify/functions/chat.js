// netlify/functions/chat.js

export const handler = async (event, context) => {
  // 1. 處理 CORS 預檢請求
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

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "❌ Netlify 後端找不到 OPENROUTER_API_KEY！" }),
    };
  }

  try {
    // 解析前端傳來的資料
    const { message, conversationHistory } = JSON.parse(event.body);
    const rawHistory = conversationHistory || [];
    
    // 轉換歷史紀錄格式
    let formattedMessages = rawHistory.map(msg => ({
      role: msg.role, 
      content: msg.content
    }));

    // 塞入最新問題
    if (message) {
      formattedMessages.push({ role: 'user', content: message });
    }

    // 塞入 System Prompt (EVkeeper 專家口吻)
    formattedMessages.unshift({
      role: 'system',
      content: "你係 EVkeeper 智能 AI 診斷專家。請完全使用香港廣東話、口語化且極具專業車主口吻來解答有關電動車充電、SOH（健康度）的問題。"
    });

    // 2. 呼叫 OpenRouter 並開啟 stream: true
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "tencent/hy3:free",
        messages: formattedMessages,
        stream: true // 👈 ⚠️ 核心：開啟串流模式！
      })
    });

    if (!response.ok) {
      const errRes = await response.text();
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: `data: {"text": "❌ OpenRouter 錯誤: ${errRes}"}\n\n`
      };
    }

    // 3. 將 OpenRouter 的打字機流（SSE）轉接，精準餵給前端的 while 循環
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let streamBody = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const rawStr = line.substring(6).trim();
          if (rawStr === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(rawStr);
            const content = parsed.choices?.[0]?.delta?.content || "";
            if (content) {
              // 轉換成前端期待的格式：data: {"text": "..."}
              streamBody += `data: ${JSON.stringify({ text: content })}\n\n`;
            }
          } catch (e) {}
        }
      }
    }

    // 4. 回傳滿足前端 Server-Sent Events 格式的串流文本
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/event-stream", // 👈 宣告這是打字機串流
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
      body: streamBody
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: `data: {"text": "💥 後端發生崩潰: ${error.message}"}\n\n`
    };
  }
};