// netlify/functions/chat.js
const fetch = require('node-fetch'); // 確保相容舊版 Node 環境（如果 Netlify 內建未啟用全域 fetch）

exports.handler = async (event, context) => {
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
      body: `data: {"text": "❌ Netlify 後端找不到 OPENROUTER_API_KEY！"}\n\n`
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

    // 2. 呼叫 OpenRouter 并開啟 stream: true
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "tencent/hy3:free",
        messages: formattedMessages,
        stream: true
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

    // 3. 處理流式輸出（相容 Node.js 傳輸層）
    let streamBody = '';
    
    // 如果是 node-fetch 的 response.body，它是一個 Node Stream，我們可以用 text() 或者直接處理
    // 為了安全並對齊你的前端 while 循環，我們將串流資料全部撈出並打包成前端要的格式
    const fullChunks = await response.text();
    const lines = fullChunks.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const rawStr = line.substring(6).trim();
        if (rawStr === '[DONE]') continue;
        
        try {
          const parsed = JSON.parse(rawStr);
          const content = parsed.choices?.[0]?.delta?.content || "";
          if (content) {
            // 轉換成你前端正在 while 循環裡死等着的格式：data: {"text": "..."}
            streamBody += `data: ${JSON.stringify({ text: content })}\n\n`;
          }
        } catch (e) {}
      }
    }

    // 4. 回傳滿足前端的串流文本
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/event-stream",
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