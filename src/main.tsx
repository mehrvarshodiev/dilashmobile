import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './App';
import './index.css';
import { ThemeProvider } from './ThemeContext';

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Dilash Mobile render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#121416', color: '#f1f3f5', fontFamily: 'system-ui, sans-serif' }}>
          <section style={{ width: '100%', maxWidth: 480, padding: 28, border: '1px solid #343a42', borderRadius: 20, background: '#191c20', textAlign: 'center' }}>
            <div style={{ color: '#f04416', fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>DILASH MOBILE</div>
            <h1 style={{ margin: '16px 0 8px', fontSize: 26, fontWeight: 800 }}>Не удалось загрузить страницу</h1>
            <p style={{ margin: '0 0 22px', color: '#b0b7c1', lineHeight: 1.6 }}>Попробуйте обновить сайт. Если ошибка повторится, очистите данные сайта в браузере и откройте страницу снова.</p>
            <button onClick={() => window.location.reload()} style={{ padding: '12px 18px', border: 0, borderRadius: 12, background: '#f04416', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Обновить страницу</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<main style="padding:24px;font-family:system-ui">Не удалось запустить Dilash Mobile: отсутствует корневой элемент страницы.</main>';
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </AppErrorBoundary>
    </React.StrictMode>,
  );
}
