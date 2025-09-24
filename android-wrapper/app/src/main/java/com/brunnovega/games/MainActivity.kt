package com.brunnovega.games

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.ProgressBar
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private var progressBar: ProgressBar? = null

    companion object {
        private const val TAG = "BrunoVegaWebView"
        private const val ERROR_HTML = """
            <html><head><meta charset='utf-8'/><style>body{font-family:Arial;padding:20px;background:#121212;color:#eee}h1{color:#ff6666}code{background:#222;padding:4px 6px;border-radius:4px;display:block;margin:8px 0}</style></head>
            <body><h1>😞 Error cargando el contenido</h1>
            <p>No se pudo abrir la página inicial. Posibles causas:</p>
            <ul>
              <li>Sin conexión a Internet (los iframes necesitan red)</li>
              <li>Un sitio externo bloquea ser embebido (X-Frame-Options)</li>
              <li>El archivo inicial no existe en assets</li>
            </ul>
            <p>Reintenta más tarde o revisa el log con <code>adb logcat | grep BrunoVegaWebView</code></p>
            </body></html>
        """
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Handler global para capturar cualquier excepción no controlada
        Thread.setDefaultUncaughtExceptionHandler { _, e ->
            runOnUiThread { showFatalError(e) }
        }

        try {
            val root = FrameLayout(this)
            webView = WebView(this)
            progressBar = ProgressBar(this).apply {
                isIndeterminate = true
                visibility = View.VISIBLE
            }
            root.addView(webView, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))
            val pbParams = FrameLayout.LayoutParams(120,120)
            pbParams.topMargin = 200
            pbParams.leftMargin = 0
            pbParams.gravity = android.view.Gravity.CENTER
            root.addView(progressBar, pbParams)
            setContentView(root)

            WebView.setWebContentsDebuggingEnabled(true)
        } catch (e: Throwable) {
            Log.e(TAG, "Fallo inicializando WebView", e)
            showFatalError(e)
            return
        }

        val settings: WebSettings = try { webView.settings } catch (e: Throwable) {
            Log.e(TAG, "No se pudo obtener settings del WebView", e)
            showFatalError(e)
            return
        }.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            cacheMode = WebSettings.LOAD_DEFAULT
            databaseEnabled = true
            setSupportZoom(false)
            mediaPlaybackRequiresUserGesture = false
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            // Permitir accesos cruzados desde file:// para assets que cargan recursos remotos
            @Suppress("DEPRECATION")
            this.allowFileAccessFromFileURLs = true
            @Suppress("DEPRECATION")
            this.allowUniversalAccessFromFileURLs = true
        }
        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                consoleMessage?.let {
                    Log.d(TAG, "JS: ${it.message()} (${it.sourceId()}:${it.lineNumber()})")
                }
                return super.onConsoleMessage(consoleMessage)
            }
        }
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                progressBar?.visibility = View.GONE
            }
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                Log.e(TAG, "onReceivedError: ${error?.description} url=${request?.url}")
                if (request == null || request.isForMainFrame) {
                    view?.loadDataWithBaseURL(null, ERROR_HTML, "text/html", "utf-8", null)
                }
            }
            override fun onReceivedHttpError(
                view: WebView?,
                request: WebResourceRequest?,
                errorResponse: WebResourceResponse?
            ) {
                super.onReceivedHttpError(view, request, errorResponse)
                Log.e(TAG, "HTTP error ${errorResponse?.statusCode} for ${request?.url}")
            }
        }

        // Determinar archivo inicial preferido
    val preferredFiles = listOf("menu-local.html", "index-games.html", "index-mobile.html", "index.html")
        val assetManager = assets
        val startFile = preferredFiles.firstOrNull { file ->
            try { assetManager.open(file).close(); true } catch (e: Exception) {
                Log.w(TAG, "No encontrado asset $file")
                false
            }
        } ?: "index.html"

        try {
                        val url = "file:///android_asset/$startFile"
                        Log.i(TAG, "Cargando $url")
                        // Inyección de capa de errores/console visual para cualquier página
                        val jsOverlay = ("""
                                (function(){
                                    if(window.__BVConsoleInjected) return; window.__BVConsoleInjected=true;
                                    const box=document.createElement('div');
                                    box.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:40%;overflow:auto;font:12px monospace;background:rgba(0,0,0,.8);color:#0f0;z-index:99999;padding:4px;';
                                    box.id='__bv_console';
                                    document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(box));
                                    function log(type,args){
                                        const line=document.createElement('div');
                                        line.style.whiteSpace='pre-wrap';
                                        line.textContent='['+type+'] '+Array.from(args).join(' ');
                                        box.appendChild(line); box.scrollTop=box.scrollHeight;
                                    }
                                    ['log','warn','error'].forEach(k=>{ const o=console[k]; console[k]=function(){ log(k,arguments); o.apply(console,arguments);} });
                                    window.addEventListener('error',e=>log('window.error',[e.message]));
                                    window.addEventListener('unhandledrejection',e=>log('promise',[e.reason]));
                                })();
                        """.trim()).replace("\n"," ")
                        webView.evaluateJavascript("$jsOverlay", null)
                        webView.loadUrl(url)
        } catch (e: Exception) {
            Log.e(TAG, "Error cargando $startFile", e)
            webView.loadDataWithBaseURL(null, ERROR_HTML, "text/html", "utf-8", null)
        }
    }

    private fun showFatalError(e: Throwable) {
        try {
            val root = FrameLayout(this)
            val tv = android.widget.TextView(this)
            tv.text = "⚠️ Error fatal:\n" + e::class.java.name + "\n" + (e.message ?: "(sin mensaje)") + "\n\n" + e.stackTrace.take(25).joinToString("\n")
            tv.setTextIsSelectable(true)
            tv.setPadding(32,64,32,64)
            tv.setBackgroundColor(0xFF111111.toInt())
            tv.setTextColor(0xFFFF6666.toInt())
            root.addView(tv)
            setContentView(root)
        } catch (_: Throwable) { /* ignore */ }
    }

    override fun onBackPressed() {
        if (this::webView.isInitialized && webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
