import "./styles.scss";
import ConnectFour from "./components/ConnectFour";

const ROWS = 7;
const COLUMNS = 8;

function App() {
  return (
    <div className="App">
      <ConnectFour rows={ROWS} columns={COLUMNS} />
    </div>
  );
}

export default App;
