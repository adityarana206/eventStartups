import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Attendee.css";
import Accordion from "../Component/Accordion";
import AddMoreIcon from "../Assets/Attendee/AddMoreIcon";
import DeleteIcon from "../Assets/Attendee/DeleteIcon";
import { load } from "@cashfreepayments/cashfree-js";
// import LoadingAnimation from '../Component/LoadingAnimation'
import animationData from "../Assets/PaymentSuccessful/Payment Successful.json";
import Loading from "../Component/Loading";

const AttendeeDetails = () => {
  const location = useLocation();
  const {
    selectedTickets,
    orderSummary,
    organisationInfo,
    ticketPrices,
    couponCode,
    validCouponCodes,
    eventData,
    couponValue,
    eventId,
    ticketInfo,
    eventName,
  } = location.state;
  // console.log("ticket Info", ticketInfo)
  const [attendees, setAttendees] = useState(
    Array(selectedTickets.length).fill({
      order_id: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      industry: "",
      designation: "",
      lookingFor: "",
      ticketType: "",
      totalMoney: 0,
      PaymentStatus: "",
    }),
  );
  const [totalMoney, setTotalMoney] = useState([]);
  const [totalTax, setTotalTax] = useState(0);
  const [pgchares, setPgcharges] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [paymentSucess, setPaymentSucess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [enteredCouponCode, setEnteredCouponCode] = useState("");
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccesss] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);
  const [phoneErrors, setPhoneErrors] = useState([]);
  // const [countIndex, setCountIndex] = useState(0)
  let countIndex = 0;
  const navigate = useNavigate();

  // const calculateTotalPrice = () => {
  //     const total = orderSummary.reduce((total, item) => {
  //         const ticket = ticketInfo.find(t => t.snfyiPayer);
  //         if (!ticket) return total + item.price;

  //         const price = item.price;
  //         const gst = 0.18 * price;
  //         const paymentGate = 0.025 * (price + gst);
  //         const itemTotal = ticket.snfyiPayer === 'me' ? price + 0.025 * price : price + gst + paymentGate;
  //         return total + itemTotal;
  //     }, 0);
  //     console.log(total, 'total cal to show')
  //     const totalmoney = total - discount;
  //     return totalmoney;
  // };

  const calculateTotalPrice = () => {
    const totalBeforeDiscount = orderSummary.reduce((total, item) => {
      const ticket = ticketInfo.find((t) => t.snfyiPayer);
      if (!ticket) return total + item.price;

      const price = item.price;
      const gst = 0.18 * price;
      const itemTotal = ticket.snfyiPayer === "me" ? price : price + gst;

      return total + itemTotal;
    }, 0);
    const totalAfterDiscount = totalBeforeDiscount - discount;
    // const paymentGate = 0.025 * totalAfterDiscount;
    const totalAfterPGCharges = totalAfterDiscount;
    //  + paymentGate;
    return totalAfterPGCharges;
  };

  const calculateTotalPriceForDataBase = () => {
    const total = orderSummary.reduce((total, item) => {
      const ticket = ticketInfo.find((t) => t.snfyiPayer);
      if (!ticket) return total + item.price;

      const price = item.price;
      const gst = 0.18 * price;
      const itemTotal = ticket.snfyiPayer === "me" ? price : price + gst;

      return total + itemTotal;
    }, 0);
    const totalmoney = total - discount;
    console.log(totalmoney, "total money recalculation");
    return totalmoney;
  };

  const ticket = ticketInfo.find((t) => t.snfyiPayer);
  useEffect(() => {
    const newTotalMoney = calculateTotalPriceForDataBase();
    if (newTotalMoney !== totalMoney) {
      setTotalMoney([parseFloat(newTotalMoney.toFixed(2))]);
    }
    const newTotalAmount = calculateTotalPrice();
    if (newTotalAmount !== totalAmount) {
      setTotalAmount(parseFloat(newTotalAmount.toFixed(2)));
    }
  }, [discount]);
  console.log(totalMoney, "money for db");
  useEffect(() => {
    let total = 0;
    orderSummary.forEach((x) => {
      total += x.price;
    });
    setTotalTicketPrice(parseFloat(total.toFixed(2)));
    setTotalTax(parseFloat(((total - discount) * 0.025).toFixed(2)));
    setGst(parseFloat((total * 0.18).toFixed(2)));
    const totalAfterDiscound = total - discount;
    setPgcharges(
      ((totalAfterDiscound + totalAfterDiscound * 0.18) * 0.025).toFixed(2),
    );
  }, [orderSummary, couponValue, discount]);

  useEffect(() => {
    const currentPath = location.pathname;
    const eventRouteRegex = /^\/event\/[^/]+$/; // Regex to match '/events/:eventName'

    if (
      currentPath !== "/attendee-details" &&
      !eventRouteRegex.test(currentPath)
    ) {
      sessionStorage.removeItem("selectedTickets");
      sessionStorage.removeItem("orderSummary");
    }
  }, [location.pathname]);

  const handleSubmit = async (updatedAttendees) => {
    // e.preventDefault();
    const eventDetails = {
      attendees: updatedAttendees,
      totalMoney,
    };

    try {
      if (eventId) {
        const eventResponse = await axios.put(
          `/api/updateEvent-by-user/${eventId}`,
          eventDetails,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log("Event updated successfully", eventResponse.data.data);
        if (eventResponse.data.status === "ok") {
          alert("Congratulation Event has been Updated");
          // navigate('/active-event')
        }
      } else {
        const eventResponse = await axios.post(
          "/api/registerEvent",
          eventDetails,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log("Event Response:", eventResponse.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("organiser", organisationInfo);

  //For Email services
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // 4-20 are all 'th'
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} '${year}`;
  }

  function formatTimeRange(startDateTimeString, endDateTimeString) {
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      let hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const period = hours >= 12 ? "pm" : "am";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'

      // Add leading zero to minutes if needed
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}${formattedMinutes !== "00" ? `:${formattedMinutes}` : ""}${period}`;
    };

    const startTime = formatTime(startDateTimeString);
    const endTime = formatTime(endDateTimeString);

    return `${startTime}-${endTime}`;
  }

  const sendConfirmationEmail = async (
    attendee,
    eventData,
    organisationInfo,
  ) => {
    const Eventdate = formatDate(eventData.startdate);
    const EventTime = formatTimeRange(eventData.startdate, eventData.enddate);

    console.log("Email", attendee.email);
    const emailInfo = {
      email: attendee.email,
      subject: `Your Ticket Confirmation for ${eventData.eventname}`,
      message: `Dear ${attendee.name},
We are thrilled to confirm your attendance at the upcoming event. Thank you for purchasing your ticket through our platform! Your support means a lot to us, and we are committed to ensuring you have a fantastic experience. Below, you will find the details of your booking:

Event Details:
- Event Name: ${eventData.eventname}
- Date: ${Eventdate}
- Location: ${eventData.city}
- Time: ${EventTime}
- Organizer: ${organisationInfo?.contactDetails[0]?.organiserName}

Attendee Information:
- Name: ${attendee.name}

To facilitate a seamless entry process, please ensure you bring a copy of this confirmation email with you to the event. This will help us verify your registration swiftly and get you settled in without any delay.

If you have any questions, need further assistance, or have special requirements, please do not hesitate to reach out to us at [Support Email/Contact Number]. We are here to help and ensure your experience is as smooth and enjoyable as possible.

We are looking forward to seeing you at [Event Name]. Your participation is highly valued, and we believe you will find the event both insightful and rewarding. Thank you once again for choosing our platform for your event needs.

Best regards,

Startupnews.fyi   
www.startupnews.fyi   
startupnewsfyi@gmail.com 
9625952588`,
    };

    try {
      const response = await axios.post("/api/send-email", emailInfo);
      console.log("Email sent:", response.data.message);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const sendConfirmationEmailForPayment = async (
    attendee,
    eventData,
    Amount,
  ) => {
    const date = new Date();

    const emailInfo = {
      email: attendee[0].email,
      subject: `Payment Confirmation for Your Ticket Booking`,
      message: `Dear ${attendee[0].name},

Thank you for your ticket purchase through startupnews.fyi. We are pleased to confirm that your payment has been successfully received.

*Payment Details:*
- *Payment Amount:* ₹ ${Amount}
- *Payment Date & Time:* ${formatDate(date)}, at ${date.toLocaleTimeString()}

This confirmation serves as your receipt for the transaction. Please save it for your records. If you have any questions about your purchase or require further assistance, please do not hesitate to contact our support team at [Support Email].

We look forward to your participation in the event and are excited to offer you an exceptional experience.

Thank you for choosing StartupNews.fyi.

Best regards,

Startupnews.fyi  
www.startupnews.fyi  
startupnewsfyi@gmail.com`,
    };

    try {
      const response = await axios.post("/api/send-email", emailInfo);
      console.log("Email sent:", response.data.message);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  //code for cashfree payment

  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };

  insitialzeSDK();

  function generateString(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  const updateAttendeesStatus = (paymentSuccess, order_id) => {
    return new Promise((resolve) => {
      setAttendees((prevAttendees) => {
        const updatedAttendees = prevAttendees.map((attendee) => ({
          ...attendee,
          PaymentStatus: paymentSuccess,
          order_id: order_id,
        }));
        resolve(updatedAttendees); // Resolve with the updated attendees
        return updatedAttendees;
      });
    });
  };

  const getSessionId = async (details) => {
    console.log("total Amounts", details);
    try {
      let res = await axios.post("/api/payment", details);
      if (res.data && res.data.payment_session_id) {
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const verifyPayment = async (orderId) => {
  //     console.log("oderId", orderId)
  //     try {

  //         let res = await axios.post("http://startupnewsfyi-env.eba-msvvew3i.ap-south-1.elasticbeanstalk.com/verify", {
  //             orderId
  //         })

  //         if (res && res.data) {
  //             alert("payment verified")
  //             updateAttendeesStatus("SuccessFul");
  //         }

  //     } catch (error) {
  //         console.log(error)
  //         updateAttendeesStatus("Failed");
  //     }
  // }
  let ordersId = 0;

  const handleClick = async (e) => {
    e.preventDefault();
    // const attendeeDetails = attendees[0];
    const order_id = await generateString();
    ordersId = order_id;
    const customerDetails = {
      customer_id: order_id,
      customer_phone: attendees[0].phone, // Collect from user input or state
      customer_name: attendees[0].name, // Collect from user input or state
      customer_email: attendees[0].email, // Collect from user input or state
    };
    const details = {
      totalAmount,
      customerDetails,
    };
    console.log("order", order_id);
    try {
      alert("Payment successful (Mocked Session)");
      const updatedAttendees = await updateAttendeesStatus(
        "Successful",
        order_id,
      );
      if (updatedAttendees) {
        handleSubmit(updatedAttendees); // Pass the updated attendees directly
        SendEmail(updatedAttendees, eventData, organisationInfo); // Send emails based on the latest state
        sendConfirmationEmailForPayment(attendees, eventData, totalAmount);
        setPaymentSucess(true);
      }
    } catch (error) {
      console.log(error);
      alert("Payment failed");
      const updatedAttendees = await updateAttendeesStatus("Failed", order_id);
      handleSubmit(updatedAttendees);
    }
  };

  // other functions

  // for successful payment
  if (paymentSucess) {
    return (
      <div className="loading">
        {/* <LoadingAnimation animationData={animationData} /> */}
        <Loading />
        {/* <span>order Id: {ordersId}</span> */}
        <h2>Name: {attendees[0].name}</h2>
        <p>Event Name:{eventData.eventname}</p>
        <p>Event Location:{eventData.city}</p>
      </div>
    ); // Add a loading indicator
  }

  const SendEmail = (updatedAttendees, eventData) => {
    updatedAttendees.forEach((attendee) => {
      if (attendee.PaymentStatus === "Successful") {
        sendConfirmationEmail(attendee, eventData, organisationInfo);
      }
    });
  };

  const applyCoupon = () => {
    if (enteredCouponCode.trim() === "") {
      setErrorMessage("Please enter correct coupon code*");
      setDiscount(0);
    } else if (enteredCouponCode === couponCode) {
      setErrorMessage("");
      const totalDiscount = couponValue * selectedTickets.length;
      setDiscount(totalDiscount);
      setSuccesss("Coupon applied successfully!");
    } else {
      setDiscount(0);
      setErrorMessage("Please enter correct coupon code*");
    }
  };

  const handleSaveAndNextAccordion = () => {
    setOpenAccordionIndex((prevIndex) => prevIndex + 1);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    let total = 0;
    const newEmailErrors = [...emailErrors];
    const newPhoneErrors = [...phoneErrors];

    if (name === "email") {
      if (!validateEmail(value)) {
        newEmailErrors[index] = "Invalid email address";
      } else {
        newEmailErrors[index] = "";
      }
      setEmailErrors(newEmailErrors);
    }

    if (name === "phone") {
      if (!validatePhone(value)) {
        newPhoneErrors[index] = "Phone number must be 10 digits";
      } else {
        newPhoneErrors[index] = "";
      }
      setPhoneErrors(newPhoneErrors);
    }

    if (name === "ticketType") {
      const ticket = ticketInfo.find((t) => t.type === value);
      if (ticket) {
        total = ticket.priceWithTax;
        console.log("totals", total);
      }
    }
    setAttendees((prevAttendees) => {
      const newAttendees = [...prevAttendees];
      newAttendees[index] = {
        ...newAttendees[index],
        [name]: value,
        totalMoney: total,
      };
      return newAttendees;
    });
  };

  const availableTicketTypes = (index) => {
    const ticketCounts = selectedTickets.reduce((acc, ticket) => {
      acc[ticket] = (acc[ticket] || 0) + 1;
      return acc;
    }, {});

    attendees.forEach((attendee, idx) => {
      if (attendee.ticketType && idx < index) {
        ticketCounts[attendee.ticketType]--;
      }
    });

    return Object.keys(ticketCounts).filter(
      (ticket) => ticketCounts[ticket] > 0,
    );
  };

  const eventDetails = () => {
    navigate(`/event/${sanitizeEventNameForURL(eventName)}`);
  };

  const ticketSummary = orderSummary.reduce((summary, item) => {
    const { ticketType, price } = item;
    if (!summary[ticketType]) {
      summary[ticketType] = { quantity: 0, price: 0 };
    }
    summary[ticketType].quantity += 1;
    summary[ticketType].price += price;
    return summary;
  }, {});

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, "-") // Replace each '|' with a single '-'
      .replace(/[^a-z0-9'-]+/g, "-") // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
      .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
      .replace(/^-|-$/g, ""); // Remove any non-word characters except dashes
  };

  const handleDeleteAndRedirect = () => {
    sessionStorage.removeItem("selectedTickets");
    sessionStorage.removeItem("orderSummary");
    navigate(`/event/${sanitizeEventNameForURL(eventName)}`);
  };

  const isAttendeeValid = (attendee, index) => {
    // List all fields that are required
    const requiredFields = [
      "name",
      "email",
      "phone",
      "city",
      "company",
      "industry",
      "designation",
      "ticketType",
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => attendee[field].trim() !== "",
    );

    const isEmailValid = !emailErrors[index]; // No error message means the email is valid
    const isPhoneValid = !phoneErrors[index]; // No error message means the phone number is valid

    return allFieldsFilled && isEmailValid && isPhoneValid;
  };

  return (
    <>
      <form className="attendee-form">
        <Accordion
          title="Order Summary"
          isOpen={openAccordionIndex === 0}
          onToggle={() => setOpenAccordionIndex(0)}
          onSaveAndNext={handleSaveAndNextAccordion}
        >
          <h3 className="text-tickets">Tickets</h3>
          <div className="tickets-details">
            <div className="priceandaddmore">
              <div className="priceandtax">
                <div className="priceandtotal">
                  {/* {orderSummary.map((item) => (
                                        <div className='priceandtype' key={item.id}>
                                            <div className='tickettype'> {item.ticketType}</div>
                                            <div className='ticketprice'> ₹{item.price}</div>
                                        </div>
                                    ))} */}
                  {Object.entries(ticketSummary).map(
                    ([ticketType, { quantity, price }]) => (
                      <div className="priceandtype" key={ticketType}>
                        <div className="quantity-details">
                          <div className="tickettype">{ticketType}</div>
                          <div className="ticketprice">₹{price}</div>
                        </div>
                        <div>x</div>
                        <div className="quantity-details">
                          <div className="tickettype">Total Quantity</div>
                          <div className="ticketprice">{quantity}</div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="ticketPrice">
                  <div className="ticketprice-tax">
                    <span className="ticketprice">₹{totalTicketPrice}</span>
                    <span className="includeTax">{""}</span>
                  </div>
                  <div
                    onClick={handleDeleteAndRedirect}
                    style={{ cursor: "pointer" }}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              <div className="addmorecontainer">
                <div className="addmore" onClick={eventDetails}>
                  <span className="addmoretext">Buy more</span>
                  <span onClick={eventDetails}>
                    <AddMoreIcon />
                  </span>
                </div>
              </div>
            </div>
            <div className="coupeninputandcode">
              <span className="question-forcode">Have a Discount code?</span>
              <div className="coupon-container">
                <input
                  type="text"
                  placeholder="Enter Coupon Code*"
                  className="code-input"
                  value={enteredCouponCode}
                  onChange={(e) => setEnteredCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  className="apply-button"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {success && <p className="success-message">{success}</p>}
            </div>
            <div className="payment-details">
              <div className="payment-small-details">
                <h2 className="payment-text">Payment Details</h2>
                <div className="payment-subdetails">
                  <span className="amount-text">
                    Ticket Amount{" "}
                    {ticket.snfyiPayer === "buyer"
                      ? "(Base Price)"
                      : "(Inc. of taxes)"}
                  </span>
                  <span className="amont-value">₹{totalTicketPrice}</span>
                </div>
                {discount > 0 && (
                  <div className="payment-subdetails">
                    <span className="amount-text">Discount</span>
                    <span className="amont-value">₹{discount}</span>
                  </div>
                )}
                {ticket.snfyiPayer === "buyer" && (
                  <div className="payment-subdetails">
                    <span className="amount-text">GST</span>
                    <span className="amont-value">₹{gst}</span>
                  </div>
                )}
                <div className="payment-subdetails">
                  <span className="amount-text">Convenience Charges</span>
                  <span className="amont-value strikethrough">
                    ₹
                    {ticket.snfyiPayer === "buyer"
                      ? ` ${pgchares} `
                      : `${totalTax}`}
                  </span>
                </div>
              </div>
              <div className="totalprice">
                <div className="payment-subdetails">
                  <span className="total-price-text">Total Amount:</span>
                  <span className="total-price-value">
                    ₹{calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="sava-button-submit-order"
              onClick={handleSaveAndNextAccordion}
              type="button"
            >
              CONTINUE
            </button>
          </div>
        </Accordion>
        {attendees.map((attendee, index) => (
          <Accordion
            key={index}
            title={`Attendee Details ${index + 1}`}
            isOpen={openAccordionIndex === index + 1}
            onToggle={() => setOpenAccordionIndex(index + 1)}
          >
            <div className="attendee-details">
              <div className="input-text-box">
                <input
                  name="name"
                  placeholder="Name*"
                  className="text"
                  value={attendee.name}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
              <div className="emailTicketType">
                <div className="email-input-error">
                  <div className="input-text-box">
                    <input
                      name="email"
                      placeholder="Email*"
                      className="text"
                      value={attendee.email}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                  {emailErrors[index] && (
                    <p className="email-error-message">{emailErrors[index]}</p>
                  )}
                </div>
                <select
                  name="ticketType"
                  value={attendee.ticketType}
                  className="text-input"
                  onChange={(e) => handleInputChange(index, e)}
                  required
                >
                  <option className="option" value="">
                    Select Ticket Type
                  </option>
                  {availableTicketTypes(index).map((ticketType, i) => (
                    <option className="option" key={i} value={ticketType}>
                      {ticketType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="emailTicketType">
                <div className="email-input-error">
                  <div className="input-text-box">
                    <input
                      name="phone"
                      placeholder="Phone Number*"
                      className="text"
                      value={attendee.phone}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                  {phoneErrors[index] && (
                    <p className="email-error-message">{phoneErrors[index]}</p>
                  )}
                </div>
                <div className="input-text-box">
                  <input
                    name="city"
                    placeholder="City*"
                    className="text"
                    value={attendee.city}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
              <div className="input-text-box">
                <input
                  name="company"
                  placeholder="Company Name*"
                  className="text"
                  value={attendee.company}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <div className="emailTicketType">
                <div className="input-text-box">
                  <input
                    name="industry"
                    placeholder="Industry*"
                    className="text"
                    value={attendee.industry}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="input-text-box">
                  <input
                    name="designation"
                    placeholder="Designation*"
                    className="text"
                    value={attendee.designation}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
              <div className="input-text-box">
                <input
                  name="lookingFor"
                  className="text"
                  placeholder="What are you looking for"
                  value={attendee.lookingFor}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <button
                type="button"
                className="sava-button"
                disabled={!isAttendeeValid(attendee, index)}
                onClick={handleSaveAndNextAccordion}
              >
                CONTINUE
              </button>
            </div>
          </Accordion>
        ))}
        {/* {<button onClick={handleClick} className='sava-button-submit' > CONTINUE</button>} */}
        {openAccordionIndex === attendees.length + 1 && (
          <button onClick={handleClick} className="sava-button-submit">
            {" "}
            CONTINUE{" "}
          </button>
        )}
      </form>
      {/* {<button onClick={SendEmail} className='sava-button-submit' >  Send Email  </button>} */}
    </>
  );
};

export default AttendeeDetails;
