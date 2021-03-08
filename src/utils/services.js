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
