class CommunicationService {
  constructor() {
    this.listeners = new Set();
    this.isConnected = false;
    this.debugInfo = '初始化中...';
    this.channel = null;
    
    this.init();
  }

  // 初始化 BroadcastChannel
  init() {
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('pos_channel');
        
        this.channel.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.isConnected = true;
        this.debugInfo = 'BroadcastChannel 已連接';
        console.log('BroadcastChannel 初始化成功');
        
      } catch (error) {
        console.error('BroadcastChannel 初始化失敗:', error);
        this.debugInfo = 'BroadcastChannel 初始化失敗';
      }
    } else {
      console.warn('BroadcastChannel 不支援');
      this.debugInfo = 'BroadcastChannel 不支援';
    }
  }

  // 發送訊息
  sendMessage(type, data) {
    if (!this.isConnected || !this.channel) {
      console.error('BroadcastChannel 未連接');
      this.debugInfo = 'BroadcastChannel 未連接';
      return;
    }

    const message = { type, data, timestamp: Date.now() };
    
    try {
      this.channel.postMessage(message);
      this.debugInfo = `已發送 ${type}`;
      console.log('發送訊息:', message);
    } catch (error) {
      console.error('發送訊息失敗:', error);
      this.debugInfo = '發送失敗';
    }
  }

  // 處理接收到的訊息
  handleMessage(message) {
    console.log('收到訊息:', message);
    this.debugInfo = `收到 ${message.type}`;
    
    // 通知所有監聽器
    this.listeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        console.error('監聽器處理訊息失敗:', error);
      }
    });
  }

  // 添加訊息監聽器
  addListener(listener) {
    this.listeners.add(listener);
  }

  // 移除訊息監聽器
  removeListener(listener) {
    this.listeners.delete(listener);
  }

  // 獲取連接狀態
  getStatus() {
    return {
      isConnected: this.isConnected,
      connectionType: this.isConnected ? 'BroadcastChannel' : null,
      debugInfo: this.debugInfo
    };
  }

  // 清理資源
  destroy() {
    if (this.channel) {
      this.channel.close();
    }
    
    this.listeners.clear();
    this.isConnected = false;
  }
}

// 創建單例實例
const communicationService = new CommunicationService();

export default communicationService; 