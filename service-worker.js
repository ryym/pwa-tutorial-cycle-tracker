// service-worker.js (by Claude)

// Service Worker のインストール
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install");
  // 新しいService Workerを即座にアクティブにする
  self.skipWaiting();
});

// Service Worker のアクティベート
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate");
  // 全てのクライアントを即座に制御下に置く
  event.waitUntil(self.clients.claim());
});

// fetch イベントをリッスン
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === "POST") {
    console.log(`Service Worker: Intercepting POST request to ${url.pathname}`);
    event.respondWith(handlePostRequest(event.request));
  }
});

// POST リクエストを処理する関数
async function handlePostRequest(request) {
  try {
    // リクエストボディを読み取る（必要に応じて）
    const requestBody = await request.text();
    console.log("Request body:", requestBody);

    // カスタムレスポンスを返す
    return new Response(`Hello from Service Worker! ${requestBody}`, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Intercepted-By": "ServiceWorker",
      },
    });
  } catch (error) {
    console.error("Error handling POST request:", error);

    // エラーレスポンスを返す
    return new Response("Error processing request", {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
