import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-natural-bg px-4">
          <div className="max-w-md w-full bg-natural-card rounded-2xl border border-natural-border p-8 text-center">
            <div className="w-16 h-16 bg-natural-earth/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-natural-earth" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-natural-green-dark mb-3">
              Oops! Ceva a mers prost
            </h1>
            <p className="text-natural-gray mb-6">
              Am întâmpinat o eroare neașteptată. Te rugăm să reîncărci pagina sau contactează suportul.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-natural-muted p-4 rounded-lg mb-6 border border-natural-border/50">
                <summary className="cursor-pointer font-bold text-natural-gray hover:text-natural-green">
                  Detalii eroare (Development)
                </summary>
                <pre className="mt-2 text-xs overflow-auto text-natural-earth">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-3 bg-natural-green text-white rounded-lg font-bold hover:bg-natural-green-dark transition-all"
            >
              Reîncarcă Pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
