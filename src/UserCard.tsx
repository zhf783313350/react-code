// 1. 定义后端的通用基础响应结构体（类似 Go 的 Response struct）
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 2. 泛型数据包装函数（纯本地模拟，不走网络请求）
function mockBackendResponse<T>(mockData: T): ApiResponse<T> {
  return {
    code: 200,
    message: "success",
    data: mockData, // 👈 这里的 data 类型由传进来的泛型决定
  };
}

// 3. 定义我们想要的数据结构
interface ChannelItem {
  id: number;
  channelName: string;
}

// 4. 组件的属性结构体
interface UserCardProps {
  name: string;
  age: number;
  isOnline?: boolean; 
  email: string;
}

// 5. 将类型应用到组件上
export function UserCard({ name, age, isOnline = false, email }: UserCardProps) {
  
  // 💡 模拟从后端传过来的数据
  const rawData = [
    { id: 101, channelName: "抖音渠道" },
    { id: 102, channelName: "微信小程序渠道" }
  ];

  // 🚀 核心：调用泛型函数，像 Go 反序列化一样，把数据死死锁在 <ChannelItem[]> 类型里
  const response = mockBackendResponse<ChannelItem[]>(rawData);
  const channels = response.data;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      <h3>{name} ({age})</h3>
      <p>邮箱: {email}</p>
      <p>状态: {isOnline ? '🟢 在线' : '⚪ 离线'}</p>
      <hr />
      <h4>📊 本地模拟的泛型渠道数据：</h4>
      <ul>
        {channels.map((item) => (
          <li key={item.id}>
            【{item.id}】{item.channelName}
          </li>
        ))}
      </ul>
    </div>
  );
}