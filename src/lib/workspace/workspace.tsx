import type { WorkSpacesInfo } from "@hexabase/hexabase-js/dist/lib/types/workspace";
import { workspacesService } from "../../services/workspace.service";

export const workspaces = async () => {
  let resWorkspaces: WorkSpacesInfo[]
  await workspacesService.getWorkspaces()
    .then(
      (data) => {
        return resWorkspaces = [...data?.workspaces]
      }
    )
    .catch()

  // const workspacesClone = resWorkspaces?.workspaces
  // const wsCurrent = resWorkspaces?.current_workspace_id
  // setWorkspaces(resWorkspaces?.workspaces);
  // setWsCurrent(resWorkspaces?.current_workspace_id);
};

// export const workspaces = getWorkspaces()
