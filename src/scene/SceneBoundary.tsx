/**
 * SceneBoundary.tsx — React error boundary wrapping the lazy 3D scene.
 *
 * If WebGL context creation fails, or if any scene component throws,
 * the boundary catches the error and renders a static CSS gradient
 * background instead. All HTML content remains fully accessible.
 *
 * Architecture notes:
 * - Class component required because React error boundaries must be classes.
 * - Logs failures with a structured object so monitoring tools can index them.
 * - Does NOT re-throw — the page must always be usable without WebGL.
 */
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  failed: boolean;
}

export class SceneBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Structured log — searchable by monitoring tools
    console.warn({
      scope: "SceneBoundary",
      message: "3D scene failed to initialise; falling back to static background.",
      detail: { error: error.message, componentStack: info.componentStack },
    });
  }

  render() {
    if (this.state.failed) {
      // Static CSS gradient fallback — matches the brand palette
      return (
        <div
          className="scene-fallback"
          role="presentation"
          aria-hidden="true"
        />
      );
    }
    return this.props.children;
  }
}
