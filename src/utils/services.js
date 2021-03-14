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
  return await axios.delete(baseURL.urlAPI + 'dogs/' + id + '/',
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const sendReservationByWalker = async (walkerId, start, end, dogId) => {
  console.log(walkerId, start, end, dogId);
  return await axios.post(baseURL.urlAPI + 'walkers/' + walkerId + '/' + 'reservation/',
    {start, end, dogId},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const getReservationByWalker = async (walker) => {
  return await axios.get(baseURL.urlAPI + 'walkers/' + walker + '/' + 'reservation/',
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const getReservationByOwner = async (walker) => {
  return await axios.get(baseURL.urlAPI + 'owners/' + walker + '/' + 'reservation/',
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const sendReservationToAll = async (walker, start, end, dog) => {
  console.log(walker, start, end, dog);
  return await axios.post(baseURL.urlAPI + 'walkers/' + walker + '/' + 'reservation/',
    {start, end, dog},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
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
  return await axios.get(baseURL.urlAPI + 'walkers/' + walker + '/' + 'constraints/',
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
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
