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
                // Inyección del overlay de consola DESPUÉS de cargar la página para que persista
                val jsOverlay = ("""
                        (function(){
                            try{
                              if(window.__BVConsoleInjected) return; window.__BVConsoleInjected=true;
                              var box=document.createElement('div');
                              box.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:45%;overflow:auto;font:11px monospace;background:rgba(0,0,0,.82);color:#0f0;z-index:2147483647;padding:4px;border-top:1px solid #1f6feb';
                              box.id='__bv_console';
                              var tag=document.createElement('div');tag.textContent='[debug overlay activo]';tag.style="color:#1f6feb;margin-bottom:4px;font-weight:bold";box.appendChild(tag);
                              document.body.appendChild(box);
                              function log(type,args){
                                var line=document.createElement('div');
                                line.style.whiteSpace='pre-wrap';
                                line.textContent='['+type+'] '+Array.from(args).join(' ');
                                box.appendChild(line); box.scrollTop=box.scrollHeight;
                              }
                              ['log','warn','error'].forEach(function(k){ var o=console[k]; console[k]=function(){ log(k,arguments); return o.apply(console,arguments);} });
                              window.addEventListener('error',function(e){ log('window.error',[e.message+' @'+e.filename+':'+e.lineno]); });
                              window.addEventListener('unhandledrejection',function(e){ log('promise',[e.reason]); });
                              log('info',['Overlay inyectado']);
                            }catch(ex){ console&&console.log('Fallo overlay',ex); }
                        })();
                """.trim()).replace("\n"," ")
                view?.evaluateJavascript(jsOverlay, null)
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
            Log.i(TAG, "Intentando leer asset $startFile")
            val html = assets.open(startFile).bufferedReader(Charsets.UTF_8).use { it.readText() }
            val annotatedHtml = StringBuilder()
                .append("<!-- asset:"+startFile+" leído OK -->\n")
                .append(if (html.contains("<base")) html else html.replaceFirst("<head>", "<head><base href=\"file:///android_asset/\">") )
                .append("\n<!-- fin asset original -->")
                .toString()
            // Añadir marca para confirmar inyección (la consola overlay real se añade en onPageFinished)
            val instrumented = annotatedHtml.replace("</body>", "<div id='__preInject' style='position:fixed;top:0;left:0;background:#1f6feb;color:#fff;font:10px monospace;padding:2px 4px;z-index:99999'>cargando ${startFile}</div></body>")
            Log.i(TAG, "Cargando asset inline via loadDataWithBaseURL (bytes=${html.length})")
            webView.loadDataWithBaseURL(
                "file:///android_asset/",
                instrumented,
                "text/html",
                "utf-8",
                null
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error leyendo/cargando $startFile", e)
            val fallback = """
                <html><head><meta charset='utf-8'><title>Fallback</title><base href='file:///android_asset/'></head>
                <body style='background:#111;color:#eee;font-family:Arial'>
                <h2>No se pudo abrir $startFile</h2>
                <p>${e::class.java.simpleName}: ${e.message}</p>
                <p>Ver logcat TAG=$TAG para detalles.</p>
                <script>console.error('Fallo cargando $startFile');</script>
                </body></html>
            """.trimIndent()
            webView.loadDataWithBaseURL("file:///android_asset/", fallback, "text/html", "utf-8", null)
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
