import { useUser } from "@clerk/clerk-react";
import { FinancialRecordList } from "./financial-record-list";
import { FinancialRecordForm } from "./financial-record-form";

import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();
  const monthlyTotal = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });
    return totalAmount;
  }, [records]);
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here Are Your Finances: </h1>
      <FinancialRecordForm />
      <div>
        Monthly Total :{" "}
        <span
          style={{
            color: monthlyTotal > 0 ? "green" : "red",
            fontWeight: "700",
          }}  
        >
          {monthlyTotal}
        </span>{" "}
      </div>
      <FinancialRecordList />
    </div>
  );
};
