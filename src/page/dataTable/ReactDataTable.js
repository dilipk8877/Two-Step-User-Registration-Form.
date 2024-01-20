import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import $ from 'jquery';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ReactDataTable = () => {
  const { savePersonalDetails, saveAddressDetails } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const newObject = { ...savePersonalDetails, ...saveAddressDetails };
  const tableRef = useRef();
  const tableName = "table1";

  const columnOrder = ["name", "age", "sex", "city", "country", "govtIDNum", "govtIDType", "phone", "pincode", "state"];

  useEffect(() => {
    if (Object.keys(savePersonalDetails).length === 0) {
      navigate("/");
    }
  }, [savePersonalDetails, navigate]);

  useEffect(() => {
    if (Object.keys(newObject).length > 0) {
      const columns = columnOrder.map(key => ({ title: key.charAt(0).toUpperCase() + key.slice(1), data: key }));

      const table = $(`#${tableName}`).DataTable({
        data: [newObject],
        columns: columns,
        destroy: true,
        searching: false,
        paging: false,
        ordering: true,
        info: false
      });

      return function () {
        console.log("Table destroyed");
        table.destroy();
      };
    }
  }, [newObject]);

  return (
    <div>
      <table className="display" width="100%" id={tableName} ref={tableRef}></table>
    </div>
  );
}

export default ReactDataTable