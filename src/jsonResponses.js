// Note this object is purely in memory
// When node shuts down this will be cleared.
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!request.body.name || !request.body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;
  const {name, age} = request.body;
  if (!users[name]) {
    responseCode = 201;
    users[name] = {};
  }

  users[name].name = name;
  users[name].age = age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    respondJSON(request, response, responseCode, responseJSON);
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  addUser,
};
