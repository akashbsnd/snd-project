// TODO GRAB TEAM MEMBER ID AND SERVICE VARIATION VERSION

// Import necessary dependencies at the top of the file
import axios from "axios";
import { toast } from "react-toastify";

// Constants
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
const LOCATION_ID = import.meta.env.VITE_LOCATION_ID;

/**
 * Main function to handle the complete booking process
 * @param {Object} userInfo - User information object
 * @param {Function} onSuccess - Callback function on successful booking
 * @param {Function} onError - Callback function on error
 * @returns {Promise<Object>} - Object containing order, invoice, and booking details
 */
// Update the BookAppointment function
export async function BookAppointment(userInfo, navigate) {
  // Environment logging
  console.log('=== ENVIRONMENT DEBUG ===');
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('LOCATION_ID:', LOCATION_ID);
  console.log('NODE_ENV:', import.meta.env.MODE);
  console.log('VITE_BACKEND_API_URL:', import.meta.env.VITE_BACKEND_API_URL);
  console.log('VITE_LOCATION_ID:', import.meta.env.VITE_LOCATION_ID);
  
  const onSuccess = (data) => {
    toast.success("Appointment booked successfully!");
    clearSessionData();
    // Redirect to home page after a short delay to show the success message
    navigate("/");
  };

  const onError = (error) => {
    console.error('=== BOOKING ERROR ===');
    console.error('Full error object:', error);
    console.error('Error response:', error?.response);
    console.error('Error status:', error?.response?.status);
    console.error('Error data:', error?.response?.data);
    
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Failed to book appointment";
    toast.error(errorMessage);
    throw error;
  };

  try {
    // Validate input parameters
    if (!userInfo || typeof userInfo !== "object") {
      throw new Error("Invalid user information provided");
    }

    console.log('=== USER INFO ===');
    console.log('User info:', userInfo);

    // Get and validate cart items
    const cartItems = getAndValidateCart();
    console.log('=== CART ITEMS ===');
    console.log('Cart items:', cartItems);
    
    const { isoStart, dueDate } = getAndValidateDate(cartItems);
    console.log('=== DATE INFO ===');
    console.log('ISO start:', isoStart);
    console.log('Due date:', dueDate);

    // Process complete booking flow
    const customerId = await findOrCreateCustomer(userInfo);
    console.log('=== CUSTOMER ===');
    console.log('Customer ID:', customerId);
    
    const order = await createOrder(customerId, cartItems);
    console.log('=== ORDER ===');
    console.log('Order:', order);
    
    const invoice = await createAndPublishInvoice(
      order.data.orderId,
      customerId,
      dueDate,
    );
    console.log('=== INVOICE ===');
    console.log('Invoice:', invoice);

    const teamMember = await getFirstTeamMember();
    console.log('=== TEAM MEMBER ===');
    console.log('Team member:', teamMember);

    const appointmentSegments = cartItems.map((item) => ({
      teamMemberId: teamMember.id,
      durationMinutes: timeStringToMinutes(item.packageTimeAlloted),
      serviceVariationId: item.packageOption.id,
      serviceVariationVersion: item.packageVersion,
    }));
    console.log('=== APPOINTMENT SEGMENTS ===');
    console.log('Appointment segments:', appointmentSegments);

    // Create booking
    console.log('=== CREATING BOOKING ===');
    const booking = await createBooking(
      customerId,
      appointmentSegments,
      isoStart,
    );
    console.log('=== BOOKING RESULT ===');
    console.log('Booking:', booking);

    if (booking) {
      const result = { order, invoice, booking, customerId };
      onSuccess(result);
      return result;
    } else {
      throw new Error("Failed to create booking");
    }
  } catch (error) {
    console.error("=== FINAL ERROR ===");
    console.error("Booking error:", error);
    onError(error);
    throw error;
  }
}

// Helper Functions

function timeStringToMinutes(timeString) {
  let hours = 0;
  let minutes = 0;

  // Extract hours if present
  const hourMatch = timeString.match(/(\d+)\s*hr/);
  if (hourMatch) {
    hours = parseInt(hourMatch[1], 10);
  }

  // Extract minutes if present
  const minMatch = timeString.match(/(\d+)\s*min/);
  if (minMatch) {
    minutes = parseInt(minMatch[1], 10);
  }

  // Convert hours to minutes and add to minutes
  return hours * 60 + minutes;
}

/**
 * Fetches and returns the first available team member
 * @returns {Promise<Object>} The first team member object from the API response
 * @throws {Error} If the request fails or no team members are found
 */
export async function getFirstTeamMember() {
  try {
    const response = await axios.get(`${API_BASE_URL}/searchTeamMembers`);

    if (
      !response.data ||
      !Array.isArray(response.data) ||
      response.data.length === 0
    ) {
      throw new Error("No team members found");
    }

    // Return the first team member
    return response.data[0];
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to retrieve team members");
  }
}

function getAndValidateCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Your cart is empty");
  }
  return cartItems;
}

function getAndValidateDate(cartItems) {
  if (!cartItems || !cartItems[0]?.apptDate || !cartItems[0]?.apptTime) {
    throw new Error("No appointment date and time found in cart");
  }

  const { apptDate, apptTime } = cartItems[0];
  const [year, month, day] = apptDate.split(",").map(Number);
  const [time, period] = apptTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format if PM and not 12 PM
  if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  // Convert 12 AM to 0 hours
  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const selectedDate = new Date(year, month - 1, day, hours, minutes);
  const isoStart = selectedDate.toISOString();
  const dueDate = isoStart.split("T")[0];

  return {
    isoStart,
    dueDate,
  };
}

async function findOrCreateCustomer(userInfo) {
  const {
    email,
    firstName,
    lastName,
    phone,
    streetAddress,
    aptSuite,
    city,
    state,
    zip,
  } = userInfo;

  try {
    // First, get all customers
    const { data: allCustomers } = await axios.get(
      `${API_BASE_URL}/getCustomers`,
    );

    // Then use find to locate the customer by email
    const existingCustomer = allCustomers.data.filter(
      (customer) => customer.email === email,
    );

    if (existingCustomer.length > 0) {
      return existingCustomer[0].id;
    }

    // If customer doesn't exist, create a new one
    const { data: newCustomer } = await axios.post(
      `${API_BASE_URL}/createCustomer`,
      {
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        streetAddress,
        suiteAddress: aptSuite,
        city,
        state,
        zipCode: zip,
        country: "US",
      },
    );
    return newCustomer.id;
  } catch (error) {
    console.error("Customer processing error:", error);
    throw new Error("Unable to process customer information");
  }
}

async function createOrder(customerId, cartItems) {
  const orderData = {
    locationId: LOCATION_ID,
    customerId,
    lineItems: cartItems.map((item) => createLineItem(item, cartItems.length)),
  };

  const data = await axios.post(`${API_BASE_URL}/createOrder`, orderData);

  if (!data) throw new Error("Failed to create order");
  return data;
}

async function createAndPublishInvoice(orderId, customerId, dueDate) {
  const { data: invoiceId } = await axios.post(
    `${API_BASE_URL}/${orderId}/createInvoice`,
    {
      orderId,
      customerId,
      dueDate,
    },
  );

  if (invoiceId.id) {
    try {
      const publishInvoice = await axios.post(
        `${API_BASE_URL}/${invoiceId.id}/publish`,
        {
          version: invoiceId.version,
        },
      );
    } catch (error) {
      console.warn("Invoice created but publishing failed:", error);
    }
  }
  return invoiceId;
}

async function createBooking(customerId, appointmentSegments, startAt) {
  const bookingData = {
    customerId,
    startAt,
    locationId: LOCATION_ID,
    appointmentSegments: appointmentSegments,
  };

  console.log('=== CREATE BOOKING DEBUG ===');
  console.log('Booking data being sent:', JSON.stringify(bookingData, null, 2));
  console.log('Request URL:', `${API_BASE_URL}/createBooking`);
  console.log('Headers:', {
    'Content-Type': 'application/json'
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/createBooking`,
      bookingData,
    );
    console.log('Booking response:', response);
    console.log('Booking response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('=== BOOKING API ERROR ===');
    console.error('Error status:', error.response?.status);
    console.error('Error status text:', error.response?.statusText);
    console.error('Error data:', error.response?.data);
    console.error('Error config:', error.config);
    console.error('Full error:', error);
    throw error;
  }
}

function clearSessionData() {
  try {
    localStorage.clear();
  } catch (error) {
    console.warn("Error clearing session data:", error);
  }
}

function createLineItem(item, quantity) {
  const basePrice = `${item.packageOption.price || 0}`;

  return {
    quantity: quantity.toString(),
    name: item.packageName,
    variation_name: item.packageOption.name,
    modifiers:
      item.addOns.map((mod) => ({
        catalog_object_id: mod.optionId,
        name: mod.optionName,
        price_money: { amount: `${mod.optionPrice}`, currency: "USD" },
      })) || [],
    base_price_money: { amount: basePrice, currency: "USD" },
    ...(item.note && { note: item.note }),
  };
}
