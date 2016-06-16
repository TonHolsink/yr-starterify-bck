import { jsonFetch } from '../utils';
import {isEmpty} from 'lodash/lang';
import sortBy from 'lodash/sortby';

function niceEmail(customerOrEmployee , useFullname) {
    let result = "";
    if (!isEmpty(customerOrEmployee.email)) {
        let name = useFullname ? customerOrEmployee.fullname : customerOrEmployee.name;
        if (isEmpty(name)) {
            result = customerOrEmployee.email;
        } else {
            result = `${name} <${customerOrEmployee.email}>`;
        }
    }
    return result;
}

function produceList(json, useFullname) {
    let list = [];
    if (json.result) {
        json.result.map((item) => {
            list.push({key: item.identification, value: niceEmail(item, useFullname)})
        });
    }
    return sortBy(list, item => item.value);
}


function fetchContracters(cb) {
    return (
        jsonFetch('customers.customersJSON.getCustomerContractors').then(json => produceList(json)).then(list => cb ? cb(list) : null)
    )
}

function fetchInternalEmployees(cb) {
    return (
        jsonFetch('users.usersJSON.getInternalEmployees').then(json => produceList(json, true)).then(list => cb ? cb(list) : null)
    )
}

export {
    fetchContracters,
    fetchInternalEmployees
}
