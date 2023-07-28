import { Field, Form } from "react-final-form";
import styles from "./FilterForm.module.scss";
import classNames from "classnames/bind";
import { DatePicker } from "rsuite";
import { useState } from "react";
const cx = classNames.bind(styles);
function FilterForm({filterCustomer}) {
  const [dataObj, setDataObj] = useState({});
//   const FormGroupAdapter = ({ input, inputOnChange}) => {
//     const inputProps = {
//       ...input,
//         value:dataObj.name,
//       onChange: (e) => {
//         input.onChange(e);
//         inputOnChange && inputOnChange(e);
//       },
//     };
//     return <input {...inputProps}/>;
//   };
  
    const format = (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const formattedToday = dd + "/" + mm + "/" + yyyy;
        return formattedToday;
    };

  const handleChange = (event) => {
    const name = event.target.name;
    const newObj = {[name]: event.target.value}
    setDataObj({...dataObj,...newObj})
    filterCustomer({...dataObj,...newObj});
    // console.log({...dataObj,...newObj});
    
  };
  const handleDate = (value)=>{
    const newObj = value?{date: format(value)}:{}
    setDataObj({...dataObj,...newObj})
    filterCustomer({...dataObj,...newObj});
    // console.log({...dataObj,...newObj});
  }
  const cleanDate = ()=>{
    const newObj = {date: ''};
    setDataObj({...dataObj,...newObj});
    filterCustomer({...dataObj,...newObj});
  }
// console.log(dataObj)
  return (
    <>
      <div className="input-area">
        <table>
          <tbody><tr>
              <td>
                <div className="input-field"><input className="text-base" type="text" name="name" placeholder="Tên" onChange={(e)=>handleChange(e)}/></div></td>
              <td>
                <div className="input-field"><input className="text-base" type="text" name="phone" placeholder="Số điện thoại" onChange={(e)=>handleChange(e)}/></div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-field">
                <DatePicker
                    className={cx("date-input")}
                    format="dd MMM yyyy"
                    onChange={(value) => {handleDate(value)}}
                    appearance="subtle"
                    onClean={()=>{
                        cleanDate()
                    }}
                />
                </div>
              </td>
              <td>
                <div className="input-field"><input className="text-base" type="text" name="township" placeholder="Thị trấn" onChange={(e)=>handleChange(e)}/></div>
              </td>
            </tr>
          </tbody></table>
      </div>
    </>
  );
}

export default FilterForm;
