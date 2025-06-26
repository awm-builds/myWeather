import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, specifiy the method, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    options.headers ||= {};
    // Older approach
    // options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log('🚀 Making API request to:', url);
  console.log('🚀 Request options:', options);
  
  const res = await fetch(url, options);
  console.log('📡 Response status:', res.status, res.statusText);
  console.log('📡 Response ok:', res.ok);
  
  // if res.ok is false then something went wrong
  if (res.ok) {
    const data = await res.json();
    console.log('✅ Response data:', data);
    return data;
  }
  
  // Try to get error details from response
  let errorMessage = 'Bad Request';
  try {
    const errorData = await res.json();
    errorMessage = errorData.error || errorData.message || errorMessage;
  } catch (e) {
    // If response is not JSON, use status text
    errorMessage = res.statusText || errorMessage;
  }
  
  console.error(`Request failed: ${res.status} ${res.statusText}`, errorMessage);
  throw new Error(errorMessage);
}
