import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application exception caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#0A0A0A] border border-[#292929] rounded-2xl p-8 shadow-2xl space-y-4">
            <div className="inline-flex p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[#C1121F]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-['Oswald'] uppercase tracking-tight text-white">
              Application Notice
            </h2>
            <p className="text-xs text-[#858585] leading-relaxed">
              An unexpected browser or extension interruption was detected. Your account credentials and cart state remain safely stored.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-4 px-5 py-2.5 bg-[#C1121F] hover:bg-[#E01B24] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Marketplace</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
