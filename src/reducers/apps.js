import { allApps } from "../utils";

const isDevMode = import.meta.env.MODE === "development";
const devAppName = ""; // set the name (lowercase) of the app you are developing so that it will be opened on refresh

const initializeAppState = () => {
  const defState = { hz: 2 };

  allApps.forEach((app) => {
    defState[app.icon] = {
      ...app,
      size: app.icon === devAppName ? "mini" : "full",
      hide: app.icon !== devAppName,
      max: app.icon === devAppName,
      z: app.icon === devAppName ? 1 : 0,
    };
  });

  return defState;
};

const initialState = initializeAppState();

const appReducer = (state = initialState, action) => {
  const tmpState = { ...state };

  switch (action.type) {
    case "EDGELINK": {
      const edgeApp = { ...tmpState["edge"] };
      edgeApp.url = action.payload?.startsWith("http")
        ? action.payload
        : action.payload && action.payload.length > 0
        ? `https://www.bing.com/search?q=${action.payload}`
        : null;

      edgeApp.size = "full";
      edgeApp.hide = false;
      edgeApp.max = true;
      edgeApp.z = ++tmpState.hz;

      tmpState["edge"] = edgeApp;
      return tmpState;
    }

    case "SHOWDSK": {
      Object.keys(tmpState).forEach((key) => {
        const app = tmpState[key];
        if (!app.hide) {
          app.max = false;
          if (app.z === tmpState.hz) {
            tmpState.hz -= 1;
          }
          app.z = -1;
        }
      });
      return tmpState;
    }

    case "EXTERNAL":
      window.open(action.payload, "_blank");
      return state;

    case "OPENTERM": {
      const terminalApp = { ...tmpState["terminal"], dir: action.payload };
      terminalApp.size = "full";
      terminalApp.hide = false;
      terminalApp.max = true;
      terminalApp.z = ++tmpState.hz;

      tmpState["terminal"] = terminalApp;
      return tmpState;
    }

    case "ADDAPP": {
      const { icon } = action.payload;
      tmpState[icon] = {
        ...action.payload,
        size: "full",
        hide: true,
        max: null,
        z: 0,
      };
      return tmpState;
    }

    case "DELAPP": {
      delete tmpState[action.payload];
      return tmpState;
    }

    default: {
      for (const key of Object.keys(state)) {
        const app = state[key];
        if (app.action === action.type) {
          const updatedApp = { ...app };

          switch (action.payload) {
            case "full":
              updatedApp.size = "full";
              updatedApp.hide = false;
              updatedApp.max = true;
              updatedApp.z = ++tmpState.hz;
              break;

            case "close":
              updatedApp.hide = true;
              updatedApp.max = null;
              updatedApp.z = -1;
              tmpState.hz -= 1;
              break;

            case "mxmz":
              updatedApp.size = updatedApp.size === "full" ? "mini" : "full";
              updatedApp.hide = false;
              updatedApp.max = true;
              updatedApp.z = ++tmpState.hz;
              break;

            case "togg":
              updatedApp.hide = false;
              if (updatedApp.z !== tmpState.hz) {
                updatedApp.max = true;
                updatedApp.z = ++tmpState.hz;
              } else {
                updatedApp.max = !updatedApp.max;
                updatedApp.z = updatedApp.max ? ++tmpState.hz : -1;
                if (!updatedApp.max) tmpState.hz -= 1;
              }
              break;

            case "mnmz":
              updatedApp.max = false;
              updatedApp.hide = false;
              if (updatedApp.z === tmpState.hz) {
                tmpState.hz -= 1;
              }
              updatedApp.z = -1;
              break;

            case "resize":
              updatedApp.size = "cstm";
              updatedApp.hide = false;
              updatedApp.max = true;
              if (updatedApp.z !== tmpState.hz) tmpState.hz += 1;
              updatedApp.z = tmpState.hz;
              updatedApp.dim = action.dim;
              break;

            case "front":
              updatedApp.hide = false;
              updatedApp.max = true;
              if (updatedApp.z !== tmpState.hz) {
                updatedApp.z = ++tmpState.hz;
              }
              break;
            default:
              break;
          }

          tmpState[key] = updatedApp;
          return tmpState;
        }
      }
    }
  }

  return state;
};

export default appReducer;
