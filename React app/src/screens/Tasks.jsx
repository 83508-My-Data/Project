import Navbar1 from "../component/Navbar1";
import Sidebar from "../component/Sidebar";

function Tasks() {
    return (
        <div className="container-fluid">
            <Navbar1 />
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col">
                    <h1>hello</h1>
                    

                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Attachment</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                            <td>1</td>
                            <td>Login Page</td>
                            <td>This is a login page</td>
                            <td><form>
                            <input type="file"></input>
                            <button className="btn btn-primary">Upload</button>
                                </form></td>
                            <td>Pending</td>
                            <td>1</td>
                        </tr>
                    
                </tbody>
            </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
