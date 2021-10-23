import {Switch, Route} from "react-router-dom";
import {Container, Typography} from "@material-ui/core";

import Layout from "./components/Layout/Layout";
import News from "./containers/News/News";
import FullPost from "./containers/FullPost/FullPost";
import AddPost from "./containers/AddPost/AddPost";

const App = () => {
  return (
      <Layout>
          <Container>
              <Switch>
                  <Route path="/" exact component={News}/>
                  <Route path="/news" exact component={News}/>
                  <Route path="/news/:id" component={FullPost}/>
                  <Route path="/add" component={AddPost}/>
                  <Route render={() => <Typography variant="h4">Not found</Typography>} />
              </Switch>
          </Container>
      </Layout>
  );
};

export default App;