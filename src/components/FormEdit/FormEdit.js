import { Component } from "react";
import { Field, Form } from "react-final-form";
import styles from "./FormEdit.module.scss";
import classNames from "classnames/bind";
import { DatePicker } from "rsuite";
const cx = classNames.bind(styles);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const required = value => (value ? undefined : 'Required')
class FormEdit extends Component {
  constructor(props) {
    super(props);
  }
  updateValue = (values) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch(`http://localhost:3000/customers/${this.props.idEdit.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.onSubmit());
  }
  onSubmitv = async (values) => {
    this.props.onCancel();
    await sleep(300);
    console.log(values)
    this.updateValue(values)
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
      console.log(dateConverted);
    }
    return (
      <DatePicker
        className={cx("date-input")}
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
    return (
      <Form
        onSubmit={this.onSubmitv}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <h4 className={cx("title")}>{this.props.title}</h4>
            <div>
              <label>Tên</label>
              <Field
                className={cx("input")}
                name="name"
                validate={required}
                component="input"
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
                validate={required}
                component="input"
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
                validate={required}
                component={this.RenderDatePicker}
                type="text"
                defaultValue={valueId.date}
              />
            </div>
            <div>
              <label>City</label>
              <Field
                className={cx("input")}
                name="city"
                validate={required}
                component="input"
                type="text"
                placeholder="Thành phố"
                defaultValue={valueId.city}
              />
            </div>
            <div>
              <label>Township</label>
              <Field
                className={cx("input")}
                name="township"
                validate={required}
                component="input"
                type="text"
                placeholder="Thị trấn"
                defaultValue={valueId.township}
              />
            </div>
            <div>
              <label>Gmail</label>
              <Field
                className={cx("input")}
                name="email"
                validate={required}
                component="input"
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
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    );
  }
}

export default FormEdit;
