import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios';
import { Modal } from 'antd';
interface Channel {
  name: string;
  phone: string;
  id: number
}
function App() {
  const [count, setCount] = useState(0)
  const [activeMenu, setActiveMenu] = useState('zhf783313350')
  const [channels, setChannels] = useState<Channel[]>([]);

  return (
    <div style={{ display: 'flex', width: '100%', flex: 1, textAlign: 'left' }}>
      <aside style={{ width: '150px', borderRight: '1px solid var(--border)', padding: '32px 20px', flexShrink: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', textSizeAdjust: 'none' }}>导航菜单</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}>
              <a href={`#menu${i + 1}`} style={{ display: 'block', padding: '12px 16px', background: 'var(--social-bg)', borderRadius: '8px', color: 'var(--text-h)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.3s' }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(`一级菜单 ${i + 1}`);
                  Modal.success({
                    title: '提示',
                    content: '正在获取渠道列表...',
                    // 直接将 onOk 改为 async
                    async onOk() {
                      try {
                        const res = await axios.get('http://localhost:10086/channels?page=1&limit=20');
                        // --- 2. 修改存储逻辑：直接存入整个数组 ---
                        if (res.data && res.data.data) {
                          setChannels(res.data.data);
                        }
                      } catch (err) {
                        console.error("网络请求失败", err);
                      }
                    }
                  })
                }}
              >
                一级菜单 {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', textAlign: 'center' }}>
        {channels.length > 0 ? (
            <div style={{ padding: '20px', margin: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#1677ff', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>渠道商列表</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fafafa', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>ID</th>
                      <th style={{ padding: '12px' }}>名称</th>
                      <th style={{ padding: '12px' }}>联系方式</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>
                        <td style={{ padding: '12px' }}>{item.id}</td>
                        <td style={{ padding: '12px' }}>{item.name}</td>
                        <td style={{ padding: '12px' }}>{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ):(
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#999' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>📊</div>
              <p>暂无数据，请点击左侧菜单并确认获取</p>
            </div>
          )}
      </main>
    </div>
  )
}
export default App
