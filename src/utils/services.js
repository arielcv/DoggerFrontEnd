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

export const editWalkerProfile = async (walkerId, bio, birthdate) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'walkers/' + walkerId + "/",
      {bio, birthdate},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success("Your data profile has been successfully changed");
    return data
  } catch (e) {
    toast.error("There was some errors with the server");
    return false
  }
};

export const editOwnerProfile = async (ownerId, bio, birthdate) => {
  try {
    const {data} = await axios.post(baseURL.urlAPI + 'owners/' + ownerId + "/",
      {bio, birthdate},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success("Your data profile has been successfully changed");
    return data
  } catch (e) {
    toast.error("There was some errors with the server");
    return false
  }
};

export const getWalkers = async () => {
  try {
    const {data} = await axios.get(`${baseURL.urlAPI}walkers/`, {
      headers: {
        'Authorization': `${localStorage.getItem('Authorization')}`
      }
    });
    return data
  } catch (e) {
    console.log(e);
    toast.error(e.response.data);
    return false
  }
};

export const getProfileDetails = async (user) => {
  try {
    const {data} = await axios.get(`${baseURL.urlAPI}users/${user}`, {
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

export const getDogsByOwner = async (ownerId) => {
  try {
    const {data} = await axios.get(`${baseURL.urlAPI}dogs/owner/${ownerId}`, {
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
    const {data} = await axios.post(`${baseURL.urlAPI}dogs/`,
      {owner, name, size},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('Your dog has been created successfully');
    return data
  } catch (e) {
    toast.error("There was some problems creating your dog");
    return e.response.data
  }
};

export const updateDog = async ({id, name, size}) => {
  try {
    const {data} = await axios.post(`${baseURL.urlAPI}dogs/${id}/`,
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
    const {data} = await axios.delete(`${baseURL.urlAPI}dogs/${id}/`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('Your dog has been removed from our system. We will miss him :(');
    return data
  } catch (e) {
    toast.error('There was some errors deleting your dog');
    return false
  }
};

export const sendReservationByWalker = async (walkerId, start, end, dogId) => {
  try {
    const {data} = await axios.post(`${baseURL.urlAPI}walkers/reservation/${walkerId}`,
      {start, end, dogId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    if (e.response.status === 400) {
      e.response.data.map(error => toast.error(error))
    } else if (e.response.status === 403) {
      toast.error("The walker can't accept your reservation because it isn't in her/his constraints");
    } else if (e.response.status === 404){
      toast.error('The walker can\'t accept your reservation because the during is greater than allowed')
    } else if (e.response.status === 406) {
      toast.error("The walker can't accept your reservation because he is busy at that time");
    } else {
      console.log(e.response.data);
      toast.error("Server error");
    }
    return false
  }
};

export const getReservationByWalker = async (walkerId) => {
  try {
    const {data} = await axios.get(`${baseURL.urlAPI}walkers/reservation/${walkerId}`,
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
    const {data} = await axios.get(`${baseURL.urlAPI}owners/reservation/${ownerId}/`,
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
    const {data} = await axios.post(`${baseURL.urlAPI}walkers/reservation/`,
      {ownerId, start, end, dogId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    return data
  } catch (e) {
    if (e.response.status === 400) {
      toast.error("The data of the reservation is incorrect")
    } else if (e.response.status === 403){
      e.response.data.map(error => toast.error(error))
    } else if (e.response.status === 406){
      toast.error("There was some errors in the server")
    }
    return false
  }
};

export const confirmReservation = async (walkerId, reservationId) => {
  try {
    const {data} = await axios.patch(`${baseURL.urlAPI}reservation/${reservationId}/`,
      {walkerId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('The reservation has been confirmed');
    return data
  } catch (e) {
    toast.success('There was some problems with the confirmation');
    return false
  }
};

export const acceptReservation = async (reservationId, walkerId) => {
  try {
    const {data} = await axios.patch(`${baseURL.urlAPI}reservation/reservationId/`,
      {walkerId},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('You have accepted the reservation. Thanks!');
    return data
  } catch (e) {
    toast.error('There was some problems accepting the reservation');
    return false
  }
};

export const createConstraints = async (walkerId, start, end, sizesAllowed) => {
  try {
    const {data} = await axios.post(`${baseURL.urlAPI}walkers/constraints/${walkerId}/`,
      {start, end, sizesAllowed},
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('Your constraint has been created succesfully');
    return data
  } catch (e) {
    toast.error('There was some problems creating the constraints');
    return false
  }
};

export const getConstraints = async (walkerId) => {
  try {
    const {data} = await axios.get(`${baseURL.urlAPI}walkers/constraints/${walkerId}`,
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
  try {
    const {data} = await axios.delete(`${baseURL.urlAPI}constraints/${id}`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('Your constraint has been removed succesfully');
    return data
  } catch (e) {
    toast.error('There was some problems removing your constraint');
    return false
  }
};

export const cancelReservation = async (reservationId) => {
  try {
    console.log(reservationId);
    const {data} = await axios.delete(`${baseURL.urlAPI}reservation/${reservationId}`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('Authorization')}`
        }
      }
    );
    toast.success('Your reservation has been canceled succesfully');
    return data
  } catch (e) {
    toast.error('There was some problems canceling your reservation');
    return false
  }
};
