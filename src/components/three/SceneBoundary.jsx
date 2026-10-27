"use client";
import { Component } from "react";

// Falls back to the 2D version if anything inside the 3D scene throws.
export default class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFail?.(); }
  render() { return this.state.failed ? null : this.props.children; }
}
