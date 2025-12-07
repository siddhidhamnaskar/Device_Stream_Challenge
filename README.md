# Device Stream Challenge Dashboard

A real-time device monitoring dashboard built with React and Vite, featuring live data visualization through Server-Sent Events (SSE). This project demonstrates efficient handling of streaming data and responsive UI design for industrial device monitoring.

## 🚀 Features

- **Real-time Data Streaming**: Live SSE connection for continuous device data updates
- **Interactive Dashboard**: Responsive layout with KPI cards, charts, and insights
- **Multiple Time Windows**: View data for 5, 15, or 30-minute intervals
- **Performance Metrics**: Track uptime, power consumption, energy usage, and throughput
- **State Visualization**: Color-coded state bands showing device operational status
- **Data Export**: Export current data window to CSV format
- **Gap Detection**: Automatic detection of data stream interruptions
- **Lazy Loading**: Optimized component loading for better performance

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Recharts** - Declarative charting library for React
- **Bootstrap** - CSS framework for responsive design
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime for the SSE server
- **HTTP Server** - Native Node.js HTTP module for SSE implementation

## 📁 Project Structure

```
Device_Stream_Challenge/
├── devicestream/                 # React Frontend
│   ├── public/
│   │   └── device_stream_20min.jsonl
│   ├── src/
│   │   ├── components/
│   │   │   ├── KPIcard.jsx       # KPI metric cards
│   │   │   ├── linearChart.jsx   # Line charts for metrics
│   │   │   ├── sparkline.jsx     # Mini throughput chart
│   │   │   ├── stateBand.jsx     # Device state timeline
│   │   │   ├── insights.jsx      # Key insights panel
│   │   │   └── metrices.jsx      # Metric calculations
│   │   ├── hooks/
│   │   │   └── useJsonlLoader.js # Data loading utilities
│   │   ├── utils/
│   │   │   ├── exportCSV.js      # CSV export functionality
│   │   │   └── metrics.js        # Additional metric functions
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Application entry point
│   ├── package.json
│   └── vite.config.js
├── live_sse_server.js           # SSE server implementation
├── device_stream_20min.jsonl     # Sample device data
└── package.json                  # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Device_Stream_Challenge
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd devicestream
   npm install
   cd ..
   ```

### Running the Application

1. **Start the SSE server** (in project root)
   ```bash
   npm start
   ```
   The server will start on `http://localhost:8080`

2. **Start the React development server** (in new terminal, devicestream folder)
   ```bash
   cd devicestream
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`

## 📊 Dashboard Components

### KPI Cards
- **Uptime %**: Percentage of time device was in RUN state
- **Idle %**: Percentage of time device was in IDLE state
- **Off %**: Percentage of time device was in OFF state
- **Avg kW**: Average power consumption
- **Energy**: Total energy consumption in kWh
- **Throughput**: Units processed per minute

### Charts
- **Power Chart**: Real-time power consumption (kW)
- **Electrical Parameters**: Voltage (VR) and current (IR) trends
- **Throughput Sparkline**: Mini chart showing processing rate
- **State Timeline**: Visual representation of device states over time

### Insights Panel
- Peak power consumption
- Phase imbalance percentage
- Average power factor

## 🔧 Configuration

### Time Windows
The dashboard supports three time windows:
- 5 minutes (default)
- 15 minutes
- 30 minutes

### Data Source
The application connects to an SSE endpoint that streams device data. In development, it uses:
```
https://devicestreamchallenge-production.up.railway.app/stream
```

For local development, you can modify the SSE URL in `App.jsx`.

## 📈 Data Format

The device data follows this JSON structure:
```json
{
  "ts": "2024-01-01T12:00:00.000Z",
  "kw": 45.2,
  "temp_c": 28.5,
  "vr": 230.1,
  "ir": 15.8,
  "state": "RUN",
  "count_total": 1250
}
```

## 🏗️ Architecture

### Frontend Architecture
- **Component-based**: Modular React components for reusability
- **State Management**: Local state with React hooks
- **Performance**: Lazy loading, memoization, and debounced updates
- **Responsive**: Bootstrap-based responsive grid system

### Backend Architecture
- **SSE Server**: Simple Node.js HTTP server for data streaming
- **Data Simulation**: Cycles through pre-recorded data for consistent demo
- **CORS Support**: Allows cross-origin requests for development

## 🔍 Key Features Explained

### Real-time Updates
- SSE connection maintains persistent connection to server
- Data updates every 100ms with debouncing to prevent excessive re-renders
- Automatic reconnection on connection loss

### Gap Detection
- Monitors time since last data received
- Visual alert when no data received for >10 seconds

### Memory Management
- Efficient filtering for time window calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Device Stream Challenge
- Uses Recharts for data visualization
- Bootstrap for responsive design
- Vite for fast development experience
