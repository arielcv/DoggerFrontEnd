import axios from 'axios'
import baseURL from "../config";

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
