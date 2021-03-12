import axios from 'axios'
import baseURL from "../config";


export const login = async (user, password) => {
  try{
    const {data} = await axios.post(baseURL.urlAPI + 'login/', {
      'username': user,
      'password': password
    });
    const token = `Token ${data.token}`;
    localStorage.setItem('Authorization', token);
    return await getProfileDetails(user)
  }catch (e) {
    console.log('Error')
  }
};

export const getWalkers = async () => {
  return await axios.get(baseURL.urlAPI + 'walkers/', {
    headers: {
      'Authorization': `${localStorage.getItem('Authorization')}`
    }
  })
};

export const getProfileDetails = async (user) => {
  return await axios.get(baseURL.urlAPI + 'users/' + user, {
    headers: {
      'Authorization': `${localStorage.getItem('Authorization')}`
    }
  })
};

export const getDogsByOwner = async (user) => {
  return await axios.get(baseURL.urlAPI + 'dogs/owner/' + user, {
    headers: {
      'Authorization': `${localStorage.getItem('Authorization')}`
    }
  })
};

export const createDog = async ({owner, name, size}) => {
  return await axios.post(baseURL.urlAPI + 'dogs/',
    {owner, name, size},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
};

export const updateDog = async ({id, name, size}) => {
  return await axios.post(baseURL.urlAPI + 'dogs/' + id + '/',
    {name, size},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
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

export const sendReservationByWalker = async (walkerId, start, end) => {
  return await axios.post(baseURL.urlAPI + 'walkers/' + walkerId + '/' + 'reservation/',
    {start, end},
    {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    }
  )
}
