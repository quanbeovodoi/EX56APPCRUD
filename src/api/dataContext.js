import { createContext, useEffect, useState } from "react";
import config from "../config/config";

export const dataContext = createContext(null);
const getData = (setCustomer)=>{
    fetch('http://localhost:3000/customers')
    .then((response) => response.json())
    .then((data) => setCustomer(data))
    .catch((error) => console.log(error));
}
export const DataProvider = (props) => {
    const [customersData,setCustomersData] = useState([]);
    const [province,setProvince] = useState([])
    const [provinceDepth2,setProvinceDepth2] = useState([]);
    const [languagesData,setLanguagesData] = useState(config.languages['VN']);
    const [languages,setLanguages] = useState('VN')
    useEffect(()=>{
        setLanguagesData(config.languages[languages])
    },[languages])
    useEffect(()=>{
        getData(setCustomersData);
        getProvinces();
    },[])
    const reRenderData = ()=>{
        getData(setCustomersData);
    }
    const addToCustomer = (value) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };
        fetch('http://localhost:3000/customers', requestOptions)
            .then(response => response.json())
            .then(data => setCustomersData([...customersData,data]))
            .catch(error => console.log(error));
    }
    const DeleteToCutomer = (id)=>{
        fetch(`http://localhost:3000/customers/${id}`, { method: 'DELETE' })
        .then(() => getData(setCustomersData));
    }
    const filterCustomer = (value) => {
        // console.log('api:', value)
        let url = 'http://localhost:3000/customers?';
        if(value.name){
            url = url+`&name_like=${value.name}`
        }
        if(value.phone){
            url = url+ `&phone_like=${value.phone}`
        }if(value.township)
        {
            url = url+ `&township_like=${value.township}`
        }
        if(value.date){
            url = url+ `&date_like=${value.date}`
        }
        if(value){
            fetch(url)
            .then((response) => response.json())
            .then((data) => setCustomersData(data))
            .catch((error) => console.log(error));
        }else
            reRenderData()
    }
    const getProvinces = () => {
        fetch('https://provinces.open-api.vn/api/')
        .then((response) => response.json())
        .then((data) => setProvince(data))
        .catch((error) => console.log(error));
    }
    const getProvinceItem = (value = '') =>{
        fetch('https://provinces.open-api.vn/api/' + "p/" + value  + "?depth=2")
        .then((response) => response.json())
        .then((data) => setProvinceDepth2(data))
        .catch((error) => console.log(error));
    }
    const contextValue = {
        languages,
        setLanguages,
        languagesData,
        setLanguagesData,
        customersData,
        province,
        provinceDepth2,
        getProvinceItem,
        addToCustomer,
        reRenderData,
        DeleteToCutomer,
        filterCustomer
    }
    // console.log(address)
    return (
        <dataContext.Provider value={contextValue}>
            {props.children}
        </dataContext.Provider>
    )
}