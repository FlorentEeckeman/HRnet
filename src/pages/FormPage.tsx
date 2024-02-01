import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormPage.css";
import { options } from "../assets/country.js";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "react-dropdown/style.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/dataSlice.js";
//import { useModal } from "@florent-eeckman/modal-component-library";
import { useModal } from "@florent-eeckman/modal-library";
type Inputs = {
  firstName: string;
  lastName: string;
  exampleRequired: string;
  state: string;
  birthDatePicker: Date;
  startDatePicker: Date;
  street: string;
  city: string;
  zipCode: string;
  department: string;
};

const FormPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { openModal } = useModal();

  const Department = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    dispatch(addEmployee(data));
    openModal({
      id: "01",
      title: "New Employee",
      desc: "Employee Created!",
      closeExisting: true,
      escapeClose: true,
      clickClose: true,
      closeClass: "closeClass",
      showClose: true,
      modalClass: "modalClass",
      blockerClass: "blockerClass",
    });
  };
  return (
    <div className="form-page">
      <h1>HRnet</h1>
      <Link to={`employee-list`}>View Current Employees</Link>
      <h2>Create Employee</h2>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          placeholder="Enter your First Name"
          {...register("firstName", { required: true })}
        />
        <label>Last Name</label>
        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="Enter your Last Name"
          {...register("lastName", { required: true })}
        />
        <label>Date of Birth</label>
        {/* register your input into the hook by invoking the "register" function */}
        <Controller
          control={control}
          name="birthDatePicker"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="dataPicker"
              placeholderText="mm/dd/yyyy"
              selected={value}
              onChange={onChange}
            />
          )}
        />

        <label>Start Date</label>
        {/* include validation with required or other standard HTML validation rules */}

        <Controller
          control={control}
          name="startDatePicker"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className="dataPicker"
              placeholderText="mm/dd/yyyy"
              selected={value}
              onChange={onChange}
            />
          )}
        />
        {/* errors will return when field validation fails  */}

        {errors.exampleRequired && <span>This field is required</span>}
        <fieldset>
          <legend>Address</legend>
          <label>Street</label>
          <input
            type="text"
            placeholder="Enter your Street Address"
            {...register("street", { required: true })}
          ></input>
          <label>City</label>
          <input
            type="text"
            placeholder="Enter your City"
            {...register("city", { required: true })}
          ></input>
          <label>State</label>
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, onBlur } }) => (
              <DropdownList
                defaultValue="Select a State"
                data={options}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <label>Zip Code</label>
          <input
            type="number"
            placeholder="Enter your Zip code"
            {...register("zipCode", { required: true })}
          ></input>
        </fieldset>
        <label>Department</label>
        <Controller
          control={control}
          name="department"
          render={({ field: { onChange, onBlur } }) => (
            <DropdownList
              defaultValue="Select a Department"
              data={Department}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <div className="submit-container">
          <input className="submit" type="submit" value="envoyer"></input>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
