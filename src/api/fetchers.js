const todosApiUrl = "http://localhost:8081/todos";

const getAll = async () => {
  const response = await fetch(todosApiUrl, { method: "GET" });
  return handleResponse(response);
};

const add = async (newTodo) => {
  const response = await fetch(todosApiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {"Content-Type": "application/json"}
  });
  return handleResponse(response);
};

const edit = async (updatedTodo) => {
    const response = await fetch(`${todosApiUrl}/${updatedTodo.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return handleResponse(response);
}

const destroy = async (id) => {
  const response = await fetch(`${todosApiUrl}/${id}`, { method: "DELETE" })
  if(!response.ok){
    throw new Error(response.status);
  }
};

const handleResponse = async (response) => {
  if (!response.ok) {
    console.log(response)
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
};

export { getAll, add, edit, destroy };
