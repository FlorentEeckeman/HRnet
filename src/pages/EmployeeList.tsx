import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import type { MUIDataTableOptions } from "mui-datatables";
import { removeUserInfos } from "../store/dataSlice.js";
import "./EmployeeList.css";
type Data = {
  data: { index: number; dataIndex: number }[];
  lookup: object;
};

const EmployeeList = () => {
  const columns = [
    "First Name",
    "Last Name",
    "Date of Birth",
    "Start Date",
    "Street",
    "City",
    "State",
    "Department",
    "Zip Code",
  ];
  const dispatch = useDispatch();
  const data = useSelector((state: { employees: string[][] }) => {
    const users = state.employees;
    console.log(state);

    console.log(users);

    const ret: string[][] = [];
    if (users !== undefined) {
      console.log("bang");

      for (let i = 0; i < users.length; i++) {
        const res: string[] = [];
        for (let u = 0; u < users[i].length; u++) {
          res.push(users[i][u]);
        }
        ret.push(res);
      }
      return ret;
    }
    console.log(ret);
    return ret;
  });
  console.log(data);

  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    onRowsDelete: (rowsDeleted: Data) => {
      console.log(rowsDeleted.data);
      console.log(rowsDeleted);
      for (let i = 0; i < rowsDeleted.data.length; i++) {
        dispatch(removeUserInfos(rowsDeleted.data[i].dataIndex - i));
      }
    },
  };

  return (
    <div className="employee-page">
      <h1>Current Employees</h1>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
      <div className="link-home">
        <Link to={`/`}>Home</Link>
      </div>
    </div>
  );
};

export default EmployeeList;
