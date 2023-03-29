import "./App.css";
import "antd/dist/reset.css";
import "./index.css";
import Routers from "./Routers";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/api/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routers />
    </ApolloProvider>
  );
}

export default App;
