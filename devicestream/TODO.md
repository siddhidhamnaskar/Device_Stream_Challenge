# Lighthouse Performance Improvements TODO

## High Impact Improvements
- [x] Optimize Vite config for minification and code splitting
- [x] Implement lazy loading for heavy chart components (LineChartComponent, Sparkline)
- [ ] Purge unused CSS from TailwindCSS and Bootstrap
- [x] Add preloading for critical resources in index.html
- [x] Implement service worker for caching
- [ ] Memoize additional calculations in App.jsx to reduce re-renders

## Testing and Validation
- [ ] Build the project and run Lighthouse to measure improvements
- [ ] Verify all components load correctly after optimizations
