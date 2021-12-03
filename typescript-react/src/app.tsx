import * as React from "react"
import * as ReactDOM from 'react-dom'
import craftXIconSrc from "./craftx-icon.png"
import { TokenForm } from './views/TokenForm';
import { Env } from './Env'

const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [userAccessToken, setAccessToken] = React.useState('');
  React.useEffect(() => {
    const search = new URLSearchParams(location.search)
    const maybeCode = search.get('code');
    maybeCode && setAccessToken(maybeCode)
  }, [location.search])

  const env = React.useMemo(() => ({
    userAccessToken,
  }), [userAccessToken]);

  return (
    <Env.Provider value={env}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <TokenForm />
        <img className="icon" src={craftXIconSrc} alt="CraftX logo" />
        <button className={`btn ${isDarkMode ? "dark" : ""}`} onClick={insertHelloWorld}>
          Hello world!
        </button>
      </div>
    </Env.Provider>
  );
}

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

function insertHelloWorld() {
  const block = craft.blockFactory.textBlock({
    content: "Hello world!"
  });

  craft.dataApi.addBlocks([block]);
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
