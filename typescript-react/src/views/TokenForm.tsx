import { useEffect, useState } from 'react'
import { useEnv } from '../Env'

export const TokenForm = () => {
  const [appID, setAppID] = useState('')
  const { userAccessToken } = useEnv();

  useEffect(() => {
    craft.storageApi.get('appID').then(appID => {
      appID.data && setAppID(appID.data)
    });
  }, [])

  const generateLarkLoginURL = () => {
    return `https://open.feishu.cn/open-apis/authen/v1/index?app_id=${appID}&redirect_uri=${location.href}`
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (appID) {
        craft.editorApi.openURL(generateLarkLoginURL()).then(console.log)
      }
    }}>
      <pre><code>{userAccessToken}</code></pre>
      <label style={{ display: 'block' }}>
        Fill the <code>App ID</code>
        follow the <a rel="noopener noreferrer" href="https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/get-" target="_blank">doc</a>
        <input required value={appID} onChange={e => {
          const value = e.target.value;
          setAppID(value)
        }} type="input" />
      </label>
      <label>
        Folder Token
        <input type="input" />
      </label>
      <button type="submit">Post</button>
    </form >
  );
}
