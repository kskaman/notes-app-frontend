// Performance monitoring utilities

export interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

// Hook to measure component render performance
export const useRenderPerformance = (componentName: string) => {
  const startTime = performance.now();
  
  return {
    measureRender: () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (import.meta.env.DEV) {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
        
        // Warn if render time is slow
        if (renderTime > 16) {
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }
      }
      
      return {
        componentName,
        renderTime,
        timestamp: Date.now(),
      } as PerformanceMetrics;
    }
  };
};

// Bundle size analysis
export const bundleAnalysis = {
  // Track component loading times
  trackComponentLoad: (componentName: string) => {
    const startTime = performance.now();
    
    return {
      complete: () => {
        const loadTime = performance.now() - startTime;
        if (import.meta.env.DEV) {
          console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
        }
        return loadTime;
      }
    };
  },

  // Memory usage tracking (development only)
  trackMemoryUsage: (label: string) => {
    if (import.meta.env.DEV && 'memory' in performance) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const memory = (performance as any).memory;
      console.log(`Memory usage (${label}):`, {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      });
    }
  }
};

// Performance optimization recommendations
export const performanceOptimizer = {
  // Check if component should use memo
  shouldMemoize: (props: Record<string, unknown>): boolean => {
    const complexProps = Object.values(props).some(value => 
      typeof value === 'object' && value !== null ||
      typeof value === 'function'
    );
    
    return complexProps || Object.keys(props).length > 5;
  },

  // Check for expensive operations that should be memoized
  isExpensiveComputation: (fn: () => unknown): boolean => {
    const start = performance.now();
    fn();
    const end = performance.now();
    
    return (end - start) > 5; // Consider expensive if > 5ms
  }
};
