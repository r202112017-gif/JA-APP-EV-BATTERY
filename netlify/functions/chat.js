// netlify/functions/chat.js

export const handler = async (event, context) => {
  // 1. CORS 預檢請求處理
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

  // 2. 讀取 API Key
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "❌ Netlify 後端找不到 OPENROUTER_API_KEY！" }),
    };
  }

  try {
    // 3. 解析前端傳來的資料
    const { history, message } = JSON.parse(event.body);
    const safeHistory = history || [];
    
    // 轉換歷史紀錄格式
    let formattedMessages = safeHistory.map(msg => ({
      role: msg.role, 
      content: msg.parts && msg.parts[0] ? msg.parts[0].text : (msg.content || "")
    }));

    // 塞入最新問題
    if (message) {
      if (formattedMessages.length === 0 || formattedMessages[formattedMessages.length - 1].content !== message) {
        formattedMessages.push({ role: 'user', content: message });
      }
    }

    // 塞入 System Prompt (EVkeeper 專家口吻)
    formattedMessages.unshift({
      role: 'system',
      content: "你係 EVkeeper 智能 AI 診斷專家。請完全使用香港廣東話、口語化且極具專業車主口吻來解答有關電動車充電、SOH（健康度）的問題。"
    });

    // 4. 用原生 fetch 呼叫 OpenRouter 
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "tencent/hy3:free", // 免費模型
        messages: formattedMessages,
      })
    });

    const resData = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "❌ OpenRouter 拒絕請求", details: resData }),
      };
    }

    // 5. 成功回傳答案給前端
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: resData.choices[0].message.content }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "💥 chat 執行失敗: " + error.message }),
    };
  }
};