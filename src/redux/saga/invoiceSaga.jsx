import { put, takeLatest } from "redux-saga/effects";
import { addDataSuccess, getDataSuccessUser } from "../Action/invoiceAction";
import { ActionType, getDataSuccess } from "../Action/invoiceAction";


function* fetchAddInvoice(data) {
  console.log(data);
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const requestGet = yield fetch(
        `https://website-fpoly-food.herokuapp.com/invoice/`,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify(data.payload),
        }
      );
      const resp = yield requestGet.json();
      console.log(resp);

      localStorage.setItem("OrderDetail", JSON.stringify({}));
      yield put(addDataSuccess(resp.body));
    } catch (error) {}
  }
}

function* SagaGetDataInvoice(data) {
  const token = localStorage.getItem("accessToken");
  console.log(data.payload)
  const requestGet = yield fetch(
    `https://website-fpoly-food.herokuapp.com/invoice?status=${data.payload}`,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    }
  );
 
  const resp = yield requestGet.json();
  console.log(resp);
  yield put(getDataSuccess(resp.body.content));
}

function* SagaGetDataInvoiceUser(data) {
  const token = localStorage.getItem("accessToken");
  try {
    try {
      const requestGet = yield fetch(
        `https://website-fpoly-food.herokuapp.com/user/my-invoice?email=${data.payload}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "*/*",

            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const resp = yield requestGet.json();
      console.log(resp);
      yield put(getDataSuccessUser(resp.body));
    } catch (error) {}
  } catch (error) {}
}

export default function* watchInvoiceSagaGetData() {
  yield takeLatest(ActionType.ADD_INVOICE_DATA, fetchAddInvoice);
  yield takeLatest(ActionType.GET_INVOICE_DATA, SagaGetDataInvoice);
  yield takeLatest(ActionType.GET_INVOICE_USER_DATA, SagaGetDataInvoiceUser);
}
