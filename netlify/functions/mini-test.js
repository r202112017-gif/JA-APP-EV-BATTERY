// netlify/functions/mini-test.js

export const handler = async (event, context) => {
  // 1. 檢查 Netlify 有無讀到環境變數
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "❌ 錯誤：Netlify 找不到 OPENROUTER_API_KEY 環境變數！" })
    };
  }

  try {
    // 2. 用最簡單、寫死咗嘅普通發問去打 OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "tencent/hy3:free",
        messages: [{ role: "user", content: "Say OK" }] // 極短文本測試
      })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: "✅ 後端連線完全正常！", ai_reply: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "❌ OpenRouter 拒絕連線", details: data })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "💥 網絡或代碼崩潰", message: err.message })
    };
  }
};