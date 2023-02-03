import type { ApplicationAndDataStore } from "@hexabase/hexabase-js/dist/lib/types/project";
import { useEffect, useState } from "react";
import { appService } from "../../services/project.service"

const Project = () => {
  const [projectName, handleProjetName] = useState('')
  const [projects, setProjects] = useState<ApplicationAndDataStore[]>([]);

  const handleProjectChangeName = (e: any) => {
    handleProjetName(e.target.value)
  }
  const getAppAndDatastore = async () => {
    const data = await appService.getAppAndDs('632ad6c00aaae33f497160ff')
    console.log(data)
    setProjects(data)

  }
  // const createApplication = async ()=>{
  //   await appService.createApp()
  // }
  useEffect(() => {
    getAppAndDatastore()
  }, [])
  console.log(projects)
  return (
    <>
      <div className="menu bg-base-100">
        <div className="flex items-center my-8">
        </div>
        {projects.map((project) => {
          return (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Display id</th>
                    <th>DataStore</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <th>{project.application_id}</th>
                    <td>{project.name}</td>
                    <td>{project.display_id}</td>
                    <td>
                      <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select Datastore</option>
                        {project.datastores?.map((datastore: any) => (
                          <option key={datastore.datastore_id}>
                            {datastore.name}
                          </option>
                        ))}

                        <option key='add_datastore'>+ Add New DataStore</option>
                      </select>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      {/* <label>
        Name:
        <input type="text" name="name" onChange={(e) => {
          handleProjectChangeName(e);
          console.log(e.target.value)
        }} />
      </label>
      <button onClick={() => getAppAndDatastore()}>Add</button> */}
      <div>
        <button className="btn">Add New Project</button>
      </div>
    </>
  )
}

export default Project