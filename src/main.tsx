import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import { PostPage } from './pages/Post'
import { TrailPage } from './pages/Trail';
import './index.css'
import { ScrollToTop } from './components/ScrollToTop'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <header className="py-6 px-6 border-b border-slate-900 bg-black/80 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-250 mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-black text-slate-50 tracking-tighter">
              CORAZZA<span className="text-blue-600">.DEV</span>
            </Link>
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 mb-4 text-sm font-bold bg-theme-bg border border-theme-border text-theme-text rounded-lg shadow-sm hover:opacity-80 transition-opacity"
            >
              <svg className="block dark:hidden" width="20px" height="20px" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                  <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-575.000000, -829.000000)" fill="#000000">
                    <path d="M586.256,845 C586.256,838.1 590.735,832.236 597,829.991 C595.243,829.361 593.353,829 591.372,829 C582.33,829 575,836.164 575,845 C575,853.837 582.33,861 591.372,861 C593.353,861 595.243,860.639 597,860.009 C590.735,857.764 586.256,851.901 586.256,845" id="moon" sketch:type="MSShapeGroup">

                    </path>
                  </g>
                </g>
              </svg>

              <svg className="hidden dark:block" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                <g>
                  <circle fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" cx="32.003" cy="32.005" r="16.001" />
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M12.001,31.997c0-2.211-1.789-4-4-4H4c-2.211,0-4,1.789-4,4
		s1.789,4,4,4h4C10.212,35.997,12.001,34.208,12.001,31.997z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M12.204,46.139l-2.832,2.833c-1.563,1.562-1.563,4.094,0,5.656
		c1.562,1.562,4.094,1.562,5.657,0l2.833-2.832c1.562-1.562,1.562-4.095,0-5.657C16.298,44.576,13.767,44.576,12.204,46.139z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M32.003,51.999c-2.211,0-4,1.789-4,4V60c0,2.211,1.789,4,4,4
		s4-1.789,4-4l-0.004-4.001C36.003,53.788,34.21,51.999,32.003,51.999z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M51.798,46.143c-1.559-1.566-4.091-1.566-5.653-0.004
		s-1.562,4.095,0,5.657l2.829,2.828c1.562,1.57,4.094,1.562,5.656,0s1.566-4.09,0-5.656L51.798,46.143z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M60.006,27.997l-4.009,0.008
		c-2.203-0.008-3.992,1.781-3.992,3.992c-0.008,2.211,1.789,4,3.992,4h4.001c2.219,0.008,4-1.789,4-4
		C64.002,29.79,62.217,27.997,60.006,27.997z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M51.798,17.859l2.828-2.829c1.574-1.566,1.562-4.094,0-5.657
		c-1.559-1.567-4.09-1.567-5.652-0.004l-2.829,2.836c-1.562,1.555-1.562,4.086,0,5.649C47.699,19.426,50.239,19.418,51.798,17.859z"
                  />
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M32.003,11.995c2.207,0.016,4-1.789,4-3.992v-4
		c0-2.219-1.789-4-4-4c-2.211-0.008-4,1.781-4,3.993l0.008,4.008C28.003,10.206,29.792,11.995,32.003,11.995z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFC222" d="M12.212,17.855c1.555,1.562,4.079,1.562,5.646-0.004
		c1.574-1.551,1.566-4.09,0.008-5.649l-2.829-2.828c-1.57-1.571-4.094-1.559-5.657,0c-1.575,1.559-1.575,4.09-0.012,5.653
		L12.212,17.855z"/>
                </g>
              </svg>
            </button>
          </div>
        </header>

        <main className="min-h-screen bg-theme-bg text-theme-text">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/post/:trailSlug/:lineSlug/:postSlug" element={<PostPage />} />
            <Route path="/trail/:slug" element={<TrailPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)