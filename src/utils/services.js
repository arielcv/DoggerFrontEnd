import axios from 'axios'
import baseURL from "../config";
import {toast} from "react-toastify";


export const login = async (user, password) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'login/', {
      'username': user,
      'password': password
    });
    const token = `Token ${data.token}`;
    localStorage.setItem('Authorization', token);
    localStorage.setItem('user', user);
    return await getProfileDetails(user)
  } catch (e) {
    console.log(e.response);
    if (e.response.status >= 400 && e.response.status < 500) {
      toast.error("Incorrect user or password")
    } else {
      toast.error("There was an error in the server")
    }
    return false
  }
};

export const getWalkers = async () => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'walkers/', {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    });
    return data
  } catch (e) {
    toast.error(e.response.data);
    return false
  }

};

export const getProfileDetails = async (user) => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'users/' + user, {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    });
    return data
  } catch (e) {
    toast.error(e.response.data);
    console.log(e.response.data);
    return false
  }
};

export const getDogsByOwner = async (user) => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'dogs/owner/' + user, {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    });
    return data
  } catch (e) {
    toast.error(e.response.data);
    return false
  }
};

export const createDog = async ({owner, name, size}) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'dogs/',
      {owner, name, size},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    return e.response.data
  }
};

export const updateDog = async ({id, name, size}) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'dogs/' + id + '/',
      {name, size},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success(`The data of ${data.name} has been succesfully modified`);
    return data
  } catch (e) {
    return false
  }
};

export const deleteDog = async (id) => {
  try {
    const {data} = await axios.delete(baseURL.urlAPI + 'dogs/' + id + '/',
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    console.log('Error');
    return false
  }
};

export const sendReservationByWalker = async (walkerId, start, end, dogId) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'walkers/' + walkerId + '/' + 'reservation/',
      {start, end, dogId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    if (e.response.status === 403) {
      toast.error("The walker can't accept your reservation because it isn't in her/his constraints");
    } else if (e.response.status === 406) {
      toast.error("The walker can't accept your reservation because this time is busy");
    } else {
      toast.error("Server error");
    }
    return false
  }
};

export const getReservationByWalker = async (walker) => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'walkers/' + walker + '/' + 'reservation/',
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    const response = {};
    if (data[0]) {
      response['assigned'] = data[0]
    }
    if (data[1]) {
      response['unassigned'] = data[1]
    }
    return response
  } catch (e) {
    console.log('Error');
    return false
  }
};

export const getReservationByOwner = async (ownerId) => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'owners/' + ownerId + '/' + 'reservation/',
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    const response = {};
    if (data[0]) {
      response['assigned'] = data[0]
    }
    if (data[1]) {
      response['unassigned'] = data[1]
    }
    return response
  } catch (e) {
    console.log('Error');
    return false
  }
};

export const sendReservationToAll = async (ownerId, start, end, dogId) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'walkers/reservation/',
      {ownerId, start, end, dogId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return true
  } catch (e) {
    console.log(e)
    return false
  }

};

export const confirmReservation = async (walker, id) => {
  console.log(walker, id);
  return await axios.patch(baseURL.urlAPI + 'walkers/' + walker + '/' + 'reservation/',
    {id},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const acceptReservation = async (id, walker) => {
  console.log(id, walker);
  return await axios.patch(baseURL.urlAPI + 'reservation/' + id + '/',
    {walker},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const createConstraints = async (walker, start, end, sizesAllowed) => {
  console.log(walker, start, end, sizesAllowed);
  return await axios.post(baseURL.urlAPI + 'walkers/' + walker + '/' + 'constraints/',
    {start, end, sizesAllowed},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const getConstraints = async (walker) => {
  try {
    const {data} = await axios.get(baseURL.urlAPI + 'walkers/' + walker + '/' + 'constraints/',
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    console.log('Error');
    return false
  }
};

export const removeConstraints = async (id) => {
  return await axios.delete(baseURL.urlAPI + 'walkers/constraints/' + id,
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};
