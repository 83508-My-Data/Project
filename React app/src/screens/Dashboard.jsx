import Navbar1 from "../component/Navbar1";
import Sidebar from "../component/Sidebar";

function Dashboard() {
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
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                            <td>1</td>
                            <td>Rishabh</td>
                            <td>Pandey</td>
                            <td>r@gmail.com</td>
                            <td>8817956102</td>
                            <td>Raipur</td>
                        </tr>
                    
                </tbody>
            </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
