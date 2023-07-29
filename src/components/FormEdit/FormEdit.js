import { Component } from "react";
import { Field, Form } from "react-final-form";
import styles from "./FormEdit.module.scss";
import classNames from "classnames/bind";
import { DatePicker } from "rsuite";
import { dataContext } from "../../api/dataContext";
import createDecorator from "final-form-focus";
const cx = classNames.bind(styles);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const focusOnErrors = createDecorator();

class FormEdit extends Component {
  static contextType = dataContext;
  constructor(props) {
    super(props);
    this.state = {
      codeP:undefined,
      town:undefined,
      change: false
    }
  }
  setCodeP = (codeP) => {
    this.setState((prevState)=>({codeP}))
  }
  setTown = (town) => {
    this.setState((prevState)=>({town}))
  }
  setChange = (change) => {
    this.setState((prevState)=>({change}))
  }
  getCodeCity = (getProvinceItem,province)=>{
    const cityFounded = province.find((item) => item.name === this.state.codeP);
    if (cityFounded) {
      getProvinceItem(cityFounded.code);
    }
    console.log(cityFounded)
  }
  componentDidMount(){
    // console.log('didmount');
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps)
    if (prevState.codeP !== this.state.codeP){
      this.getCodeCity(this.context.getProvinceItem,this.context.province)
      
      
    }
    if(prevState.town === this.state.town){

      this.setTown(this.context.provinceDepth2);
      console.log('updated mount',this.context.provinceDepth2);
    }
  }
  format = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };
  InputRow = ({
    name,
    type,
    placeholder,
    input,
    meta: { active, error, touched },
  }) => {
    return (
      <div className={active ? "active" : ""} style={{ width: "75%" }}>
        <input
          className={cx("input")}
          {...input}
          type={type}
          placeholder={placeholder}
        />
        {error && touched && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  };
  InputTel = ({
    name,
    type,
    placeholder,
    input,
    meta: { active, error, touched },
  }) => {
    let phoneNumber;
    // if(input.value.split('').length < 6){
    //   console.log('Nho hon 6');
    //   phoneNumber = input.value.replace(/^(\d{3})(\d{1}).*/, '$1 $2');
    // }
    // else {
    //   console.log('Lon hon 6');
    //   phoneNumber = input.value.replace(/\s/g, '').replace(/^(\d{3})(\d{3})(\d{4}).*/, '$1 $2 $3');
    // }
    if (input.value) phoneNumber = input.value.replace(/\D/g, "");
    if (input.value.length > 3) {
      phoneNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3);
    }
    if (input.value.length > 7) {
      phoneNumber = phoneNumber.slice(0, 7) + " " + phoneNumber.slice(7);
    }
    // console.log(phoneNumber);
    return (
      <div className={active ? "active" : ""} style={{ width: "75%" }}>
        <input
          className={cx("input")}
          {...input}
          type={type}
          placeholder={placeholder}
          value={phoneNumber}
        />
        {error && touched && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  };
  selecteInput = ({
    name,
    defvalue,
    type,
    placeholder,
    input,
    meta: { active, error, touched },
    province,
    setCodeP,
  }) => {
    return (
      <div className={active ? "active" : ""} style={{ width: "75%" }}>
        <select
          className={cx("input")}
          {...input}
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setCodeP(e.target.value ? e.target.value : undefined);
          }}
          value={defvalue}
        >
          {!defvalue ? <option value={""}>{placeholder}</option> : ""}
          {province.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {error && touched && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  };
  
  selecteInputTownShip = ({
    name,
    type,
    placeholder,
    input,
    meta: { active, error, touched },
    valueCity,
  }) => {
    // console.log(valueCity)
    return (
      <div className={active ? "active" : ""} style={{ width: "75%" }}>
        <select
          className={cx("input")}
          {...input}
          type={type}
          placeholder={placeholder}
        >
          <option>{placeholder}</option>
          {valueCity
            ? valueCity.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))
            : ""}
        </select>
        {error && touched && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  };
  updateValue = (values) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch(
      `http://localhost:3000/customers/${this.props.idEdit.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.props.onSubmit());
  };
  onSubmitv = async (values) => {
    this.props.onCancel();
    await sleep(300);
    // console.log(values);
    this.updateValue(values);
  };
  RenderDatePicker = ({ name, input, input: { value, onChange } }) => {
    const format = (date) => {
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = dd + "/" + mm + "/" + yyyy;
      return formattedToday;
    };
    let dateConverted;
    if (input.value) {
      dateConverted = this.convertDatePicker(input.value);
      // console.log(dateConverted);
    }
    return (
      <DatePicker
        className={cx("date-input")}
        format="dd/MM/yyyy"
        onChange={(value) => {
          input.onChange(format(new Date(value)));
        }}
        defaultValue={dateConverted}
      />
    );
  };
  convertDatePicker = (value) => {
    const dateConverted = new Date();
    const newArr = value.split("/");
    dateConverted.setFullYear(newArr[2], newArr[1] - 1, newArr[0]);
    return dateConverted;
  };
  render() {
    const valueId = this.props.idEdit;
    const wpcontext = this.context;
    return (
      <Form
        validate={(values) => {
          const numberPhone = values.phone
            ? values.phone.replace(/\s/g, "")
            : undefined;
          const errors = {};
          const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          if (values.name === undefined) {
            errors.name = "Không được để trống";
          }
          if (values.phone === undefined) {
            errors.phone = "Không được để trống";
          } else if (isNaN(numberPhone)) {
            errors.phone = "Số điện thoại phải là chữ số";
          } else if (
            numberPhone.split("").length < 10 ||
            numberPhone.split("").length > 11
          ) {
            errors.phone =
              "Số điện thoại phải có ít nhất là 10 số tối đa là 11 số";
          } else if (!numberPhone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
            errors.phone = "Số điện thoại phải theo chuẩn Việt Nam";
          }
          if (values.township === undefined) {
            errors.township = "Không được để trống";
          }
          if (values.city === undefined) {
            errors.city = "Không được để trống";
          }
          if (values.email === undefined) {
            errors.email = "Không được để trống";
          } else if (!values.email.match(mailformat)) {
            errors.email = "Email ko hợp lệ !";
          }
          return errors;
        }}
        decorators={[focusOnErrors]}
        onSubmit={this.onSubmitv}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <h4 className={cx("title")}>{this.props.title}</h4>
            <div>
              <label>Tên</label>
              <Field
                className={cx("input")}
                name="name"
                component={this.InputRow}
                type="text"
                placeholder="Tên"
                defaultValue={valueId.name}
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <Field
                className={cx("input")}
                name="phone"
                component={this.InputTel}
                type="text"
                placeholder="Số điện thoại"
                defaultValue={valueId.phone}
              />
            </div>
            <div>
              <label>Ngày sinh</label>
              <Field
                className={cx("input")}
                name="date"
                
                component={this.RenderDatePicker}
                type="text"
                defaultValue={valueId.date}
                initialValue={this.format(new Date())}
              />
            </div>
            <div>
              <label>City</label>
              <Field
                className={cx("input")}
                name="city"
                component={this.selecteInput}
                type="text"
                placeholder="Thành phố"
                province={wpcontext.province}
                setCodeP={this.setCodeP}
                defvalue={this.state.codeP}
                initialValue={this.state.codeP}
                // defaultValue={valueId.city}
              />
            </div>
            <div>
              <label>Township</label>
              <Field
                className={cx("input")}
                name="township"
                type="text"
                component={this.selecteInputTownShip}
                placeholder="Thị trấn"
                valueCity={this.state.town ? this.state.town.districts : undefined}
                // defaultValue={valueId.township}
              />
            </div>
            <div>
              <label>Gmail</label>
              <Field
                className={cx("input")}
                name="email"
                component={this.InputRow}
                type="email"
                placeholder="email"
                defaultValue={valueId.email}
              />
            </div>
            <div className={cx("buttons")}>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => this.props.onCancel()}>
                Cancel
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default FormEdit;
