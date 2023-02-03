import type { WorkSpacesInfo } from "@hexabase/hexabase-js/dist/lib/types/workspace";
import { useEffect, useState } from "react";
import { workspacesService } from "../../services/workspace.service";

const WorkSpace = () => {
  const [workspaces, setWorkspaces] = useState<any>([]);
  const [wsCurrent, setWsCurrent] = useState<string | undefined>('');
  const [wsName, setWsName] = useState("");
  console.log('wsName', wsName)
  const getWorkspaces = async () => {
    const resWorkspaces = await workspacesService.getWorkspaces();
    setWorkspaces(resWorkspaces?.workspaces);
    setWsCurrent(resWorkspaces?.current_workspace_id);
  };

  useEffect(() => {
    getWorkspaces()
  }, [])

  const handleClick = () => {
    console.log(workspaces)
    console.log(wsCurrent)
  }
  const handleCreateWorkspace = async (wsName: string) => {
    console.log('getWorkspaces()', wsName)
    await workspacesService.createWorkspace({ name: wsName })
    getWorkspaces()
    console.log('success')
  }
  const handleChangeWsName = (e: any) => {
    setWsName(e.target.value);
  };
  return (
    <>
      <ul className="menu bg-base-100">
        <div>

          <div className="flex items-center my-8">


            <select className="select select-bordered w-full max-w-xs">

              <option disabled selected>Select WorkSpace </option>
              {workspaces?.map((workspace: any) => (
                <option key={workspace.workspace_id}>
                  {workspace.workspace_name}
                </option>
              ))}
            </select>
          </div>


        </div>

        <div>
          <button className="btn">
            Add New Workspace
          </button>
        </div>
      </ul>
      {/* <div className="overflow-x-auto">
        <table className="table w-full">

          <thead >
            <tr className="border-y-orange-900">
              <th>ID</th>
              <th>Workspace</th>
            </tr>
          </thead>
          <tbody>



            {workspaces?.map((workspace: any) => (
              <>
                <tr>
                  <td className="w-1/5">
                    {workspace.workspace_id}
                  </td>
                  <td key={workspace.workspace_id}>
                    {workspace.workspace_name}
                  </td>
                </tr>
              </>
            ))}




          </tbody>
        </table>
      </div> */}


      {/* <label>
        Name:
        <input type="text" name="name" onChange={(e) => {
          handleChangeWsName(e);
          console.log(e.target.value)
        }} />
      </label>
      <button onClick={() => handleCreateWorkspace(wsName)}>Add</button> */}

    </>
  )
}

export default WorkSpace