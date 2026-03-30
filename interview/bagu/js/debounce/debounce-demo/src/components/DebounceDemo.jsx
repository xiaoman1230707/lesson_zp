import { useState, useCallback, useRef } from 'react';
import debounce from '../utils/debounce';
import './DebounceDemo.css';

/**
 * Debounce 功能演示组件
 * 展示各种配置选项和实际使用场景
 */
function DebounceDemo() {
  // ==================== 状态定义 ====================
  const [basicLogs, setBasicLogs] = useState([]);
  const [leadingLogs, setLeadingLogs] = useState([]);
  const [bothLogs, setBothLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [buttonCount, setButtonCount] = useState(0);

  // 用于追踪函数调用
  const basicCallCount = useRef(0);
  const leadingCallCount = useRef(0);
  const bothCallCount = useRef(0);

  // ==================== Debounce 实例 ====================

  // 基础防抖
  const basicDebounce = useCallback(
    debounce((value) => {
      basicCallCount.current += 1;
      setBasicLogs(prev => [...prev, {
        id: Date.now(),
        value,
        count: basicCallCount.current,
        time: new Date().toLocaleTimeString(),
      }]);
    }, 800),
    []
  );

  // Leading 模式防抖
  const leadingDebounce = useCallback(
    debounce((value) => {
      leadingCallCount.current += 1;
      setLeadingLogs(prev => [...prev, {
        id: Date.now(),
        value,
        count: leadingCallCount.current,
        time: new Date().toLocaleTimeString(),
      }]);
    }, 800, { leading: true, trailing: false }),
    []
  );

  // Leading + Trailing 同时启用
  const bothDebounce = useCallback(
    debounce((value) => {
      bothCallCount.current += 1;
      setBothLogs(prev => [...prev, {
        id: Date.now(),
        value,
        count: bothCallCount.current,
        time: new Date().toLocaleTimeString(),
      }]);
    }, 800, { leading: true, trailing: true }),
    []
  );

  // 搜索防抖（带 pending 状态）
  const searchDebounceRef = useRef(
    debounce((query) => {
      // 模拟搜索 API 调用
      const results = [
        `搜索结果 1: "${query}"`,
        `搜索结果 2: "${query}"`,
        `搜索结果 3: "${query}"`,
      ];
      setSearchResults(results);
    }, 500)
  );

  // 按钮点击防抖（leading 模式防止重复提交）
  const buttonDebounceRef = useRef(
    debounce(() => {
      setButtonCount(prev => prev + 1);
    }, 2000, { leading: true, trailing: false })
  );

  // ==================== 事件处理 ====================

  const handleBasicInput = (e) => {
    const value = e.target.value;
    basicDebounce(value);
  };

  const handleLeadingInput = (e) => {
    const value = e.target.value;
    leadingDebounce(value);
  };

  const handleBothInput = (e) => {
    const value = e.target.value;
    bothDebounce(value);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchDebounceRef.current(query);
  };

  const handleButtonClick = () => {
    buttonDebounceRef.current();
  };

  const handleCancelSearch = () => {
    searchDebounceRef.current.cancel();
    setSearchResults([]);
  };

  const handleFlushSearch = () => {
    searchDebounceRef.current.flush();
  };

  const handleResetButton = () => {
    buttonDebounceRef.current.reset();
    setButtonCount(0);
  };

  const clearLogs = (setLogFn) => {
    setLogFn([]);
  };

  // ==================== 渲染 ====================

  return (
    <div className="debounce-demo">
      <h1>企业级 Debounce 函数演示</h1>

      {/* 基础防抖演示 */}
      <section className="demo-section">
        <h2>1. 基础防抖（trailing 模式）</h2>
        <p className="description">
          默认配置：多次输入只会在停止输入 800ms 后执行最后一次。
          适用于搜索框等场景。
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="输入文字，观察防抖效果..."
            onChange={handleBasicInput}
            className="demo-input"
          />
          <button onClick={() => clearLogs(setBasicLogs)} className="clear-btn">
            清空日志
          </button>
        </div>
        <div className="logs">
          <h3>执行日志：</h3>
          {basicLogs.length === 0 ? (
            <p className="empty">等待输入...</p>
          ) : (
            <ul>
              {basicLogs.map(log => (
                <li key={log.id} className="log-item">
                  <span className="log-count">#{log.count}</span>
                  <span className="log-value">值: "{log.value}"</span>
                  <span className="log-time">{log.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Leading 模式演示 */}
      <section className="demo-section">
        <h2>2. Leading 模式（立即执行）</h2>
        <p className="description">
          配置：{`{ leading: true, trailing: false }`}。
          首次输入立即执行，后续输入在等待期内被忽略。
          适用于防止重复点击的场景。
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="输入文字，首次立即执行..."
            onChange={handleLeadingInput}
            className="demo-input"
          />
          <button onClick={() => clearLogs(setLeadingLogs)} className="clear-btn">
            清空日志
          </button>
        </div>
        <div className="logs">
          <h3>执行日志：</h3>
          {leadingLogs.length === 0 ? (
            <p className="empty">等待输入...</p>
          ) : (
            <ul>
              {leadingLogs.map(log => (
                <li key={log.id} className="log-item leading">
                  <span className="log-count">#{log.count}</span>
                  <span className="log-value">值: "{log.value}"</span>
                  <span className="log-time">{log.time}</span>
                  <span className="badge leading-badge">LEADING</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Leading + Trailing 演示 */}
      <section className="demo-section">
        <h2>3. Leading + Trailing 同时启用</h2>
        <p className="description">
          配置：{`{ leading: true, trailing: true }`}。
          首次立即执行，停止输入后再次执行最后一次。
          适用于需要实时反馈和最终确认的场景。
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="输入文字，观察 leading 和 trailing 效果..."
            onChange={handleBothInput}
            className="demo-input"
          />
          <button onClick={() => clearLogs(setBothLogs)} className="clear-btn">
            清空日志
          </button>
        </div>
        <div className="logs">
          <h3>执行日志：</h3>
          {bothLogs.length === 0 ? (
            <p className="empty">等待输入...</p>
          ) : (
            <ul>
              {bothLogs.map((log, index) => (
                <li key={log.id} className="log-item both">
                  <span className="log-count">#{log.count}</span>
                  <span className="log-value">值: "{log.value}"</span>
                  <span className="log-time">{log.time}</span>
                  <span className={`badge ${index % 2 === 0 ? 'leading-badge' : 'trailing-badge'}`}>
                    {index % 2 === 0 ? 'LEADING' : 'TRAILING'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 搜索演示（带控制方法） */}
      <section className="demo-section">
        <h2>4. 搜索防抖 + 控制方法</h2>
        <p className="description">
          演示 cancel()、flush()、pending() 等控制方法的使用。
          可用于取消搜索或立即执行搜索。
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="输入搜索内容..."
            value={searchQuery}
            onChange={handleSearch}
            className="demo-input"
          />
          <button onClick={handleCancelSearch} className="control-btn cancel">
            Cancel
          </button>
          <button onClick={handleFlushSearch} className="control-btn flush">
            Flush
          </button>
          <span className={`pending-status ${searchDebounceRef.current?.pending() ? 'active' : ''}`}>
            Pending: {searchDebounceRef.current?.pending() ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="search-results">
          <h3>搜索结果：</h3>
          {searchResults.length === 0 ? (
            <p className="empty">输入内容开始搜索...</p>
          ) : (
            <ul className="results-list">
              {searchResults.map((result, index) => (
                <li key={index} className="result-item">{result}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 按钮防抖演示 */}
      <section className="demo-section">
        <h2>5. 按钮防抖（防止重复提交）</h2>
        <p className="description">
          使用 leading 模式防止用户快速多次点击按钮。
          点击后 2 秒内再次点击无效。
        </p>
        <div className="button-group">
          <button onClick={handleButtonClick} className="action-btn">
            点击计数
          </button>
          <button onClick={handleResetButton} className="control-btn reset">
            Reset
          </button>
          <span className="count-display">计数: {buttonCount}</span>
        </div>
        <p className="hint">
          快速多次点击按钮，观察计数只增加 1 次。2 秒后才能再次增加。
        </p>
      </section>

      {/* API 文档 */}
      <section className="demo-section api-section">
        <h2>API 文档</h2>
        <div className="api-grid">
          <div className="api-card">
            <h3>debounce(func, wait, options)</h3>
            <ul>
              <li><code>func</code> - 需要防抖的函数</li>
              <li><code>wait</code> - 延迟时间（毫秒）</li>
              <li><code>options.leading</code> - 是否立即执行</li>
              <li><code>options.trailing</code> - 是否延迟后执行</li>
            </ul>
          </div>
          <div className="api-card">
            <h3>控制方法</h3>
            <ul>
              <li><code>cancel()</code> - 取消防抖</li>
              <li><code>reset()</code> - 重置状态</li>
              <li><code>flush()</code> - 立即执行</li>
              <li><code>pending()</code> - 检查是否有待执行</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DebounceDemo;
