// TODO GRAB TEAM MEMBER ID AND SERVICE VARIATION VERSION

// Import necessary dependencies at the top of the file
import axios from "axios";
import { toast } from "react-toastify";

// Add axios interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('=== AXIOS REQUEST ===');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Data:', request.data);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('=== AXIOS RESPONSE ===');
  console.log('URL:', response.config.url);
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  return response;
}, error => {
  console.log('=== AXIOS ERROR ===');
  console.log('URL:', error.config?.url);
  console.log('Status:', error.response?.status);
  console.log('Error Data:', error.response?.data);
  return Promise.reject(error);
});

// Constants
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

function getLocationId() {
  return sessionStorage.getItem('locationId') || localStorage.getItem('locationId');
}

// Validate environment variables at startup
if (!API_BASE_URL) {
  throw new Error('VITE_BACKEND_API_URL environment variable is not set');
}

function getJwtToken(providedToken = null) {
  if (providedToken) return providedToken;
  return localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
}

async function verifyUserWithJwt(jwtToken) {
  try {
    const response = await axios.get(`${API_BASE_URL}/verifyUser`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw new Error('User verification failed. Please log in again.');
  }
}

/**
 * Main function to handle the complete booking process
 * @param {Object} userInfo - User information object
 * @param {Function} onSuccess - Callback function on successful booking
 * @param {Function} onError - Callback function on error
 * @returns {Promise<Object>} - Object containing order, invoice, and booking details
 */
// Update the BookAppointment function
export async function BookAppointment(userInfo, navigate, jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  console.log('=== JWT TOKEN DEBUG ===');
  console.log('Token present:', !!token);
  console.log('Token source:', jwtToken ? 'parameter' : 'storage');
  
  // Runtime environment debugging
  console.log('=== RUNTIME ENVIRONMENT DEBUG ===');
  console.log('Raw env vars:', {
    VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
    VITE_LOCATION_ID: import.meta.env.VITE_LOCATION_ID,
    MODE: import.meta.env.MODE
  });
  console.log('Parsed constants:', {
    API_BASE_URL,
    locationId: getLocationId()
  });
  console.log('Types:', {
    API_BASE_URL_TYPE: typeof API_BASE_URL,
    locationId_TYPE: typeof getLocationId(),
    API_BASE_URL_LENGTH: API_BASE_URL?.length,
    locationId_LENGTH: getLocationId()?.length
  });

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

    // Get and validate cart items
    const cartItems = getAndValidateCart();
    
    const { isoStart, dueDate } = getAndValidateDate(cartItems);

    // Process complete booking flow
    console.log('=== STARTING BOOKING FLOW ===');
    console.log('User info provided:', !!userInfo);
    console.log('User info keys:', userInfo ? Object.keys(userInfo) : 'No user info');
    
    const customerId = await findOrCreateCustomer(userInfo, token);
    console.log('Customer ID result:', customerId);
    console.log('Customer ID type:', typeof customerId);
    console.log('Customer ID is truthy:', !!customerId);
  
    if(!customerId) {
      throw new Error("Failed to find or create customer");
    }
    
    const order = await createOrder(customerId, cartItems, token);
    
    if(!order) {
      throw new Error("Failed to create order");
    }

    const invoice = await createAndPublishInvoice(
      order.data.orderId,
      customerId,
      dueDate,
      token,
    );

    if(!invoice) {
      throw new Error("Failed to create invoice");
    }

    const teamMember = await getFirstTeamMember(token);
    
    if(!teamMember) {
      throw new Error("Failed to get team member");
    }

    const appointmentSegments = cartItems.map((item) => ({
      teamMemberId: teamMember.id,
      durationMinutes: timeStringToMinutes(item.packageTimeAlloted),
      serviceVariationId: item.packageOption.id,
      serviceVariationVersion: item.packageVersion,
    }));

    // Create booking
    const booking = await createBooking(
      customerId,
      appointmentSegments,
      isoStart,
      token,
    );
    

    if(!booking) {
      throw new Error("Failed to create booking");
    } 

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
export async function getFirstTeamMember(jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  if (!token) {
    throw new Error("JWT token required. Please log in.");
  }
  
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${API_BASE_URL}/searchTeamMembers`, {
      headers,
    });

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
  const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
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

async function findOrCreateCustomer(userInfo, jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  if (!token) {
    throw new Error("JWT token required. Please log in.");
  }
  
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

  const headers = { Authorization: `Bearer ${token}` };

  console.log('=== FIND OR CREATE CUSTOMER ===');
  console.log('User email:', email);
  console.log('API URL:', `${API_BASE_URL}/getCustomers`);

  try {
    // First, get all customers
    const { data: allCustomers } = await axios.get(
      `${API_BASE_URL}/getCustomers`,
      { headers },
    );

    if(!allCustomers || !allCustomers.data) {
      throw new Error("Failed to retrieve customers");
    }

    console.log('Customers retrieved:', allCustomers.data.length);

    // Then use find to locate the customer by email
    const existingCustomer = allCustomers.data.filter(
      (customer) => customer.email === email,
    );

    console.log('Existing customer filter result:', existingCustomer);

    if (existingCustomer.length > 0) {
      console.log('Found existing customer:', existingCustomer[0].id);
      return existingCustomer[0].id;
    }else{
    const newCustomer = await axios.post(
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
      { headers },
    );

    // If customer doesn't exist, create a new one
    console.log('Creating new customer...', newCustomer);
    
    if (!newCustomer || !newCustomer.data || !newCustomer.data.id) {
      throw new Error("Failed to create new customer");
    }
    
    console.log('New customer created:', newCustomer.data.id);
    return newCustomer.data.id;
    }
  } catch (error) {
    console.error("Customer processing error:", error);
    if (error.response?.status === 403) {
      throw new Error("Authentication failed. Please log in again.");
    }
    throw new Error("Unable to process customer information");
  }
}

async function createOrder(customerId, cartItems, jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  if (!token) {
    throw new Error("JWT token required. Please log in.");
  }
  
  const headers = { Authorization: `Bearer ${token}` };

  console.log('=== CREATE ORDER ===');
  console.log('Customer ID:', customerId);
    console.log('Location ID:', getLocationId());
  console.log('Cart Items:', cartItems);
  
  // Validate required fields
  if (!customerId) {
    throw new Error("Customer ID is required to create order");
  }
  const locationId = getLocationId();
  if (!locationId) {
    throw new Error("Location ID is required. Please log in again.");
  }
  
  const orderData = {
    locationId,
    customerId,
    lineItems: cartItems.map((item) => createLineItem(item, cartItems.length)),
  };

  console.log('Order data being sent:', JSON.stringify(orderData, null, 2));

  try {
    const response = await axios.post(`${API_BASE_URL}/createOrder`, orderData, { headers });
    console.log('Order created successfully:', response.data);
    return response;
  } catch (error) {
    console.error('=== CREATE ORDER ERROR ===');
    console.error('Error response:', error.response?.data);
    
    // Handle specific authentication errors
    if (error.response?.data?.errors?.some(err => err.code === 'FORBIDDEN')) {
      throw new Error('Authentication failed. Please check your login status and try again.');
    }
    
    throw error;
  }
}

async function createAndPublishInvoice(orderId, customerId, dueDate, jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  if (!token) {
    throw new Error("JWT token required. Please log in.");
  }
  
  const headers = { Authorization: `Bearer ${token}` };

  const { data: invoiceId } = await axios.post(
    `${API_BASE_URL}/${orderId}/createInvoice`,
    {
      orderId,
      customerId,
      dueDate,
    },
    { headers },
  );

  if (invoiceId.id) {
    try {
      const publishInvoice = await axios.post(
        `${API_BASE_URL}/${invoiceId.id}/publish`,
        {
          version: invoiceId.version,
        },
        { headers },
      );
    } catch (error) {
      console.warn("Invoice created but publishing failed:", error);
    }
  }
  return invoiceId;
}

async function createBooking(customerId, appointmentSegments, startAt, jwtToken = null) {
  const token = jwtToken || getJwtToken();
  
  if (!token) {
    throw new Error("JWT token required. Please log in.");
  }
  
  const headers = { Authorization: `Bearer ${token}` };
  const locationId = getLocationId();
  
  if (!locationId) {
    throw new Error("Location ID is required. Please log in again.");
  }

  const bookingData = {
    customerId,
    startAt,
    locationId,
    appointmentSegments: appointmentSegments,
  };

  console.log('=== CREATE BOOKING DEBUG ===');
  console.log('Booking data being sent:', JSON.stringify(bookingData, null, 2));
  console.log('Request URL:', `${API_BASE_URL}/createBooking`);
  console.log('Headers:', {
    'Content-Type': 'application/json',
    ...headers,
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/createBooking`,
      bookingData,
      { headers },
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
    sessionStorage.clear();
    localStorage.removeItem('jwt');
    document.cookie = 'cart_backup=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'userId=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
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
