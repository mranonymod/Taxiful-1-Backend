const request = require('request');

// Define the base URL for the API
const baseURL = 'http://localhost:5000/api';

// Define the test cases
const testCases = [
  {
    name: 'Test case 1: Get all users',
    url: baseURL + '/users',
    method: 'GET',
    expectedStatusCode: 200,
  },
  {
    name: 'Test case 2: Get a specific user',
    url: baseURL + '/users/:userId',
    method: 'GET',
    expectedStatusCode: 200,
  },
  {
    name: 'Test case 3: Create a new user',
    url: baseURL + '/users',
    method: 'POST',
    body: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    },
    expectedStatusCode: 201,
  },
  {
    name: 'Test case 4: Update a specific user',
    url: baseURL + '/users/:userId',
    method: 'PUT',
    body: {
      name: 'Jane Doe',
    },
    expectedStatusCode: 200,
  },
  {
    name: 'Test case 5: Delete a specific user',
    url: baseURL + '/users/:userId',
    method: 'DELETE',
    expectedStatusCode: 204,
  },
];

// Run the tests
testCases.forEach((testCase) => {
  request({
    url: testCase.url,
    method: testCase.method,
    json: testCase.body,
  }, (error, response, body) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else if (response.statusCode !== testCase.expectedStatusCode) {
      console.error(`Error: ${testCase.name} returned ${response.statusCode}`);
    } else {
      console.log(`Success: ${testCase.name} returned ${response.statusCode}`);
    }
  });
});
