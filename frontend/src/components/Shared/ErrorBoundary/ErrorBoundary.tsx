import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryContent } from './ErrorBoundaryContent';

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('Uncaught error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBoundaryContent />;
    }

    return this.props.children;
  }
}
