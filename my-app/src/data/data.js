export const getApi = async () => {
  return await fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
    .then(response => response.json())
}




