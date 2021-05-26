import { useState } from "react";
import Main from "../../apps/cp/Main";
import Dashboard from "../../apps/cp/views/Dashboard";
import Users from "../../apps/cp/views/Users";
import Subs from "../../apps/cp/views/Subscriptions";
import Leads from "../../apps/cp/views/Leads";
import Posts from "../../apps/cp/views/Posts";
import { makeStyles } from "@material-ui/core/styles";
import withRoot from "../../components/prebuilt/withRoot";
import { useSession } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-8px",
    backgroundColor: "white",
  },
}));

function Admin() {
  const classes = useStyles();
  const [state, setState] = useState({
    leads: null,
    subs: null,
    posts: null,
    accounts: null,
  });
  const [session, loading] = useSession();
  const [view, setView] = useState(
    <Dashboard state={state} setState={setState} />
  );
  const changeView = (v) => setView(views[v]);
  const views = {
    dashboard: <Dashboard state={state} setState={setState} />,
    users: <Users accounts={state.accounts} />,
    subscriptions: <Subs subs={state.subs} />,
    leads: <Leads leads={state.leads} />,
    posts: <Posts posts={state.posts} />,
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in! Please sign in first</h1>
        </div>
      </main>
    );
  } else if (session && !session.user.groups.includes("admin")) {
    return (
      <main>
        <div>
          <h1>You aren't authorized to view this content</h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <Main changeView={changeView}>
        <div className={classes.root}>{view}</div>
      </Main>
    </>
  );
}

export default withRoot(Admin);
