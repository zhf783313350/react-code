import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Modal, Tag, message, Button, Input } from 'antd'
import dayjs from 'dayjs'
 
interface GoZeroResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserItem {
  id: number;
  phoneNumber: string;
  status: number;
  validTime: string;
}

interface ListData {
  list?: UserItem[];
}

interface LoginData {
  accessToken: string;
  accessExpire: number;
  userInfo: UserItem;
}

function App() {
  const [channels, setChannels] = useState<UserItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 🌟 新增状态：控制登录流程
  const [phoneNumber, setPhoneNumber] = useState<string>('18126232764'); // 默认填入测试手机号
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);         // 是否登录成功
  const [savedToken, setSavedToken] = useState<string>('');             // 缓存拿到的 Token

  // 🌟 动作①：核心登录函数
  const handleLogin = async () => {
    if (!phoneNumber.trim()) {
      message.warning('请输入手机账号');
      return;
    }
    setLoading(true);
    try {
      const loginRes = await axios.post<GoZeroResponse<LoginData>>('http://47.115.39.175:8080/api/user/login', {
        phoneNumber: phoneNumber
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (loginRes.data && loginRes.data.code === 200 && loginRes.data.data?.accessToken) {
        const token = loginRes.data.data.accessToken;
        setSavedToken(token);
        setIsLoggedIn(true);
        message.success('登录成功，正在加载数据...');
        
        // 登录成功后紧接着自动请求第一页列表
        await fetchUserList(token, 1);
      } else {
        message.error(loginRes.data.message || '登录失败');
      }
    } catch (err) {
      console.error("登录请求失败", err);
      message.error('登录网络请求失败，请检查后端');
    } finally {
      setLoading(false);
    }
  };

  // 🌟 动作②：专门用来加载/刷新列表数据的函数
  const fetchUserList = async (token: string, targetPage: number) => {
    setLoading(true);
    setCurrentPage(targetPage);
    try {
      const listRes = await axios.post<GoZeroResponse<ListData | UserItem[]>>('http://47.115.39.175:8080/api/user/list', {
        page: targetPage,
        pageSize: 5
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (listRes.data && listRes.data.code === 200 && listRes.data.data) {
        const rawData = listRes.data.data;
        const fullList = Array.isArray(rawData) ? rawData : (rawData.list || []);
        setChannels(fullList);
      } else {
        message.error(listRes.data.message || '获取列表失败');
      }
    } catch (err) {
      console.error("请求列表失败", err);
      message.error('获取列表请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa', padding: '40px 0' }}>
      
      {/* 🌟 状态控制：如果没有登录，显示登录卡片 */}
      {!isLoggedIn ? (
        <div style={{ width: '400px', padding: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '8px', color: '#1677ff' }}>系统登录</h2>
          <p style={{ color: '#999', marginBottom: '30px' }}>请输入绑定的手机账号进行认证</p>
          
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>账号 (手机号)</label>
            <Input 
              size="large" 
              placeholder="请输入手机号码" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>

          <Button  
           type="primary"
            size="large" 
            block 
            loading={loading}
            onClick={handleLogin}
            style={{ height: '45px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
          >
            登 录
          </Button>
        </div>
      ) : (
        
        /* 🌟 状态控制：如果登录成功，显示列表展示区 */
        <div style={{ width: '90%', maxWidth: '1000px', display: 'flex', flexDirection: 'column' }}>
          
          {/* 顶栏控制条 */}
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '15px', padding: '0 20px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <strong>当前账号：</strong><Tag color="blue">{phoneNumber}</Tag>
            </div>
            <Button size="small" onClick={() => { setIsLoggedIn(false); setChannels([]); }}>退出登录</Button>
          </div>

          {channels.length > 0 ? (
            <div style={{ padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#1677ff', borderBottom: '2px solid #f0f0f0', textAlign: 'left', paddingBottom: '10px', margin: 0 }}>用户信息列表</h3>
              
              <div style={{ maxHeight: '600px', overflowY: 'auto', marginTop: '15px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fafafa', textAlign: 'center' ,fontSize: '20px', color: '#1b0bfd' }}>
                      <th style={{ padding: '12px' }}>ID</th>
                      <th style={{ padding: '12px' }}>状态</th>
                      <th style={{ padding: '12px' }}>联系方式</th>
                      <th style={{ padding: '12px' }}>有效时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((item) => (
                      <tr 
                        key={item.id} 
                        style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'center', fontSize: '18px' ,color:'#1b0bfd', cursor: 'pointer' }} 
                        onClick={() => {
                          setSelectedUser(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <td style={{ padding: '12px' }}>{item.id}</td>
                        <td style={{ padding: '12px' }}>{item.status === 1 ? <Tag color="success">正常</Tag> : <Tag color="error">禁用</Tag>}</td>
                        <td style={{ padding: '12px' }}>{item.phoneNumber}</td>
                        <td style={{ padding: '12px' }}>{dayjs(item.validTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 底部分页控制区 */}
              <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                <Button 
                  type="primary"
                  disabled={currentPage <= 1 || loading}
                  onClick={() => fetchUserList(savedToken, currentPage - 1)}
                >
                  上一页
                </Button>
                
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  第 {currentPage} 页
                </span>
                
                <Button 
                  type="primary"
                  disabled={channels.length < 5 || loading}
                  onClick={() => fetchUserList(savedToken, currentPage + 1)}
                >
                  下一页
                </Button>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '60px', color: '#999' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>📊</div>
              <p>暂无数据记录</p>
            </div>
          )}
        </div>
      )}

      {/* 详情对话框 */}
      <Modal
        title="🔍 当前行的全部完整信息"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        okText="知道了"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {selectedUser ? (
          <div style={{ marginTop: '20px', fontSize: '16px' }}>
            <p><strong>用户 ID：</strong> {selectedUser.id}</p>
            <p><strong>手机号码：</strong> {selectedUser.phoneNumber}</p>
            <p><strong>账号状态：</strong> {selectedUser.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>}</p>
            <p><strong>有效时间：</strong> {dayjs(selectedUser.validTime).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
        ) : (
          <p>暂无详细数据</p>
        )}
      </Modal>
    </div>
  )
}

export default App