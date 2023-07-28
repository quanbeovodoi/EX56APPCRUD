import createDecorator from "final-form-focus";
import styles from "./FormAdd.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { DatePicker } from "rsuite";
import { dataContext } from "../../api/dataContext";

const cx = classNames.bind(styles);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const focusOnErrors = createDecorator();
const InputRow = ({
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
const InputTel = ({
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
const selecteInput = ({
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

const selecteInputTownShip = ({
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
function FormAdd({ title, onSubmit, onCancel }) {
  const { province, getProvinceItem, provinceDepth2 } = useContext(dataContext);
  const [codeP, setCodeP] = useState();
  const [town, setTown] = useState();
  const [valueDate, setValueDate] = useState(new Date());
  useEffect(() => {
    const cityFounded = province.find((item) => item.name === codeP);
    if (cityFounded) {
      getProvinceItem(cityFounded.code);
    }
  }, [codeP]);

  useEffect(() => {
    setTown(provinceDepth2);
  }, [provinceDepth2]);
  // console.log(provinceDepth2)
  // console.log('town:',town)
  const onSubmitv = async (values) => {
    onCancel();
    await sleep(300);
    onSubmit(values);
  };
  const format = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };
  const RenderDatePicker = ({ name, input, input: { value, onChange } }) => {
    return (
      <DatePicker
        className={cx("date-input")}
        format="dd/MM/yyyy"
        onChange={(value) => {
          input.onChange(format(new Date(value)));
        }}
        defaultValue={valueDate}
      />
    );
  };
  return (
    <>
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
        onSubmit={onSubmitv}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <h4 className={cx("title")}>{title}</h4>
            <div>
              <label>Tên</label>
              <Field
                className={cx("input")}
                name="name"
                component={InputRow}
                type="text"
                placeholder="Tên"
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <Field
                className={cx("input")}
                name="phone"
                component={InputTel}
                type="text"
                placeholder="Số điện thoại"
              />
            </div>
            <div>
              <label>Ngày sinh</label>
              <Field
                className={cx("input")}
                name="date"
                component={RenderDatePicker}
                type="text"
                placeholder="Ngày sinh"
                initialValue={format(new Date())}
              />
            </div>
            <div>
              <label>City</label>
              <Field
                className={cx("input")}
                name="city"
                component={selecteInput}
                placeholder="Thành phố"
                province={province}
                setCodeP={setCodeP}
                defvalue={codeP}
                initialValue={codeP}
              />
            </div>
            <div>
              <label>Township</label>
              <Field
                name="township"
                component={selecteInputTownShip}
                placeholder="Thị trấn"
                valueCity={town ? town.districts : undefined}
              />
            </div>
            <div>
              <label>Gmail</label>
              <Field
                className={cx("input")}
                name="email"
                component={InputRow}
                type="email"
                placeholder="email"
              />
            </div>
            <div className={cx("buttons")}>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => onCancel()}>
                Cancel
              </button>
            </div>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </>
  );
}

export default FormAdd;
