function apiCall(url, method, bodyContent, auth) {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth
    },
    method: method,
    body: JSON.stringify(bodyContent)
  });
}

export function createUser(content) {
  return apiCall('http://localhost:3001/users/auth/register', 'POST', content, null);
}

export function loginUser(content) {
  return apiCall('http://localhost:3001/users/auth/login', 'POST', content, null);
}

export function getUser(auth) {
  return apiCall('http://localhost:3001/users', 'GET', undefined, auth);
}

export function getProjects(auth) {
  return apiCall('http://localhost:3001/projects', 'GET', undefined, auth);
}

export function createProject(content, auth) {
  return apiCall('http://localhost:3001/projects', 'POST', content, auth);
}
