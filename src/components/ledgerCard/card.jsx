import React from "react";
import { useDispatch } from "react-redux";
import { ledgerFullPay } from "../../state/redux/userApi";
import { Card, Typography, Box, Button } from "@mui/material";
import "../../components/cardList/cards.less";

const ActionCard = ({ data, totalData, memberDetails }) => {
  const dispatch = useDispatch();

  console.log("userfrrrrrrrrrrrrrrrrrs", data);

  // Button action handlers (replace with real actions)
  const handleFullPay = (data) => {
    console.log("Full Pay clicked", totalData, data);
    const getTodayDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = today.getFullYear();
      return `${day}-${month}-${year}`;
    };
    let payload = {
      "collectionType": "ledger",
      "memberDetail": [
          {
              "memberId": memberDetails?.memberId,
              "memberType": memberDetails?.memberType,
              "userType": memberDetails?.userType,
          }
      ],
      "collectionDetail": {
          "amount": "900",
          "title": "ledger",
          "date": getTodayDate()
      },
      "payDetail": {
          "payType": "cash",
          "UTR": ""
      },
      "ledgercollectionDetail": {
          "chanthaAmount": data?.chanthaBalance,
          "chanthapayedDate": "10-01-2025",
          "committeeAmount": "100",
          "committeepayedDate": "10-01-2025",
          "deathtributeAmount": "100",
          "deathtributepayedDate":"10-01-2025",
          "eventsfineAmount": "100",
          "eventsfinepayedDate":"10-01-2025",
          "oldbalanceAmount": "100",
          "oldbalancepayedDate":"10-01-2025",
          "oldcreditbalanceAmount": "100",
          "oldcreditbalancepayedDate": "10-01-2025"
      }
  }
    // dispatch(fetchFullPayApi(data));
  };

  const handlePartialPay = () => {
    console.log("Partial Pay clicked");
  };

  const handleClear = () => {
    console.log("Clear clicked");
  };

  const fetchFullPayApi = async (payload) => {
    console.log("Received Payload in fetchSearchList:", payload); // Confirm payload here

    try {
      const response = await ledgerFullPay(payload); // API call
      if (response.status) {
        // dispatch(searchMembers(response?.data)); // Dispatch to Redux store
      } else {
        console.error("API response error:", response);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "visible",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6ea8fe",
            padding: "20px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            textAlign: "center",
          }}
          className={"editcard"}
        >
          <Typography variant="subtitle1" className="action-card-name">
            Ledger Balance details
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "calc(15% - 30px)",
          }}
        ></Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "10px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            textAlign: "center",
            minHeight: "70px",
          }}
        >
          <Box
            className="action-card-details-item"
            sx={{ paddingBottom: "10px" }}
          >
            {data?.ledgerBalance && "Total Ledger Amount"}
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              className="action-card-memberId"
            >
              {data?.ledgerBalance}
            </Typography>
          </Box>
          <Box
            className="action-card-details-item"
            sx={{ paddingBottom: "10px" }}
          >
            Total Chantha Amount
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              className="action-card-balance"
            >
              {data?.chanthaBalance}
            </Typography>
          </Box>
          <Box className="action-card-details-item">
            Other Credit Balance
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              className="action-card-balance"
            >
              {data?.oldCreditBalance}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleFullPay(data)}
          sx={{ borderRadius: "20px", minWidth: "120px" }}
        >
          Full Pay
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePartialPay}
          sx={{ borderRadius: "20px", minWidth: "120px" }}
        >
          Partial Pay
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClear}
          sx={{ borderRadius: "20px", minWidth: "120px" }}
        >
          Clear
        </Button>
      </Box>
    </>
  );
};

export default ActionCard;
