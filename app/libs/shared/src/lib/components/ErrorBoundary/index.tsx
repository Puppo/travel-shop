import { trackError } from '@travel-shop-app/utils';
import React, { PropsWithChildren } from 'react';


type ErrorBoundaryProps = PropsWithChildren<{
  name: string;
}>;

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo = {}) {
    trackError(error, {
      ...errorInfo,
      name: this.props.name,
      errorType: 'ErrorBoundary',
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>
            <h1>Error in the Micro-FE module {this.props.name}</h1>
          </div>
          <button onClick={() => this.setState(() => ({ hasError: false }))}>
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
