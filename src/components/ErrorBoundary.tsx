import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex items-center justify-center min-h-screen bg-neutral-50">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Something went wrong</h1>
            <p className="text-lg text-neutral-600 mb-8">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="btn-primary"
            >
              Go Home
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
